import { memo, useMemo, useEffect, useState, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { UserRole } from '../features/auth/types/auth.types'
import { AUTH_TOKEN_KEY } from '../app/app_constants'

type RoleProtectedRouteProps = {
  readonly children: React.ReactNode
  readonly allowedRoles: readonly UserRole[]
}

const RoleProtectedRoute = memo(({ children, allowedRoles }: RoleProtectedRouteProps) => {
  const user = useAppSelector((state) => state.auth.user)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const location = useLocation()
  const [isBusinessLoading, setIsBusinessLoading] = useState(true)
  const previousBusinessIdRef = useRef<string | undefined>(undefined)

  // Track if business loading is complete
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setIsBusinessLoading(false)
      previousBusinessIdRef.current = undefined
      return
    }

    const businessId = user.business

    // If user has no businessId, loading is complete immediately
    if (!businessId) {
      setIsBusinessLoading(false)
      previousBusinessIdRef.current = businessId
      return
    }

    // If businessId changed, we're starting a new load
    if (previousBusinessIdRef.current !== businessId) {
      previousBusinessIdRef.current = businessId
      setIsBusinessLoading(true)
      // Use a timeout to allow session-state-manager to complete
      // This gives time for the business fetch to complete or fail
      const timer = setTimeout(() => {
        setIsBusinessLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }

    // If businessId exists and hasn't changed, business loading should be complete
    // The session-state-manager should have run by now
    setIsBusinessLoading(false)
  }, [isAuthenticated, user, user?.business])

  const hasAccess = useMemo(() => {
    // Check if there's a token in localStorage - if so, we might be waiting for auth check
    const hasToken = localStorage.getItem(AUTH_TOKEN_KEY)
    
    // Wait for auth check to complete before making any decisions
    // If there's a token but user is not authenticated yet, we're still loading
    if (isLoading || (hasToken && !isAuthenticated)) {
      return null // Still loading auth, don't redirect yet
    }

    if (!isAuthenticated || !user) {
      return false
    }

    // Wait for session-state-manager to resolve
    if (isBusinessLoading) {
      return null // Still loading, don't redirect yet
    }

    // Check if user has required role
    if (!user.role) {
      return false
    }

    return allowedRoles.includes(user.role)
  }, [isAuthenticated, user, isLoading, isBusinessLoading, allowedRoles])

  // Still loading auth or business data
  if (hasAccess === null) {
    return null
  }

  // No access, redirect to dashboard home
  if (!hasAccess) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  return <>{children}</>
})

RoleProtectedRoute.displayName = 'RoleProtectedRoute'

export default RoleProtectedRoute

