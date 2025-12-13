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

      if (!isAuthenticated) {
        return
      }

      const businessId = user?.business

      // If user has no businessId, explicitly set business to null to mark loading as complete
      if (!businessId) {
        if (business === undefined) {
          dispatch(setBusiness(null))
        }
        return
      }

      // If business is already loaded, don't fetch again
      if (business !== null && business !== undefined) {
        return
      }

      try {
        isLoadingRef.current = true
        const businessService = BusinessService.getInstance()
        const businessData: Business = await businessService.getBusinessById(businessId)
        dispatch(setBusiness(businessData))
      } catch (error) {
        console.error('Failed to fetch business:', error)
        // Explicitly set to null on error to mark loading as complete
        dispatch(setBusiness(null))
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

