import { memo, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setBusiness } from '../auth/redux/auth-slice'
import BusinessService from '../business/services/business.service'
import { Business } from '../business/types/business.types'

const SessionStateManager = memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const business = useAppSelector((state) => state.auth.business)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    const fetchBusiness = async (): Promise<void> => {
      if (isLoadingRef.current) {
        return
      }

      const businessId = user?.business

      if (!businessId || business || !isAuthenticated) {
        return
      }

      try {
        isLoadingRef.current = true
        const businessService = BusinessService.getInstance()
        const businessData: Business = await businessService.getBusinessById(businessId)
        dispatch(setBusiness(businessData))
      } catch (error) {
        console.error('Failed to fetch business:', error)
      } finally {
        isLoadingRef.current = false
      }
    }

    fetchBusiness()
  }, [user?.business, business, isAuthenticated, dispatch])

  return null
})

SessionStateManager.displayName = 'SessionStateManager'

export default SessionStateManager

