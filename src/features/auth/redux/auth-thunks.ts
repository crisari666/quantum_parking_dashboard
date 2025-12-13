import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
import { setUser, setLoading, setError, clearError, clearUser } from './auth-slice'
import { SignInRequest } from '../types/auth.types'
import { authService } from '../services/auth.service'
import { AUTH_TOKEN_KEY } from '../../../app/app_constants'
import BusinessService from '../../business/services/business.service'

export const signIn = createAsyncThunk<
  boolean,
  SignInRequest,
  {
    dispatch: AppDispatch
    state: RootState
  }
>(
  'auth/signIn',
  async (credentials, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      dispatch(clearError())
      
      const response = await authService.signIn(credentials)

      console.log({response})
      
      
      // Store token in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, response.token)
      
      // Fetch business if business ID is provided
      let business = null
      if (response.business) {
        try {
          const businessService = BusinessService.getInstance()
          business = await businessService.getBusinessById(response.business)
        } catch (error) {
          console.warn('Failed to fetch business:', error)
          // Continue with login even if business fetch fails
        }
      }
      
      dispatch(setUser({
        user: {
          id: response.id,
          username: response.email || '',
          enabled: true,
          business: response.business,
          role: response.role,
        },
        token: response.token,
        business: business
      }))
      dispatch(setLoading(false))
      
      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
      dispatch(setError(errorMessage))
      dispatch(setLoading(false))
      
      return false
    }
  }
)

export const signOut = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>(
  'auth/signOut',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      
      await authService.signOut()
      
      // Clear token from localStorage
      localStorage.removeItem(AUTH_TOKEN_KEY)
      
      dispatch(clearUser())
      dispatch(setLoading(false))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed'
      dispatch(setError(errorMessage))
      dispatch(setLoading(false))
    }
  }
)

export const checkAuthStatus = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>(
  'auth/checkAuthStatus',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      
      if (!token) {
        dispatch(clearUser())
        return
      }
      
      // Try to get current user to validate token
      const user = await authService.getCurrentUser()
      
      if (user) {
        dispatch(setUser({
          user: {
            id: user.id || user._id || '',
            username: user.username || user.email || '',
            enabled: user.enabled ?? true,
            business: user.business,
            role: user.role,
          },
          token: token
        }))
      } else {
        // Token is invalid, clear it
        localStorage.removeItem(AUTH_TOKEN_KEY)
        dispatch(clearUser())
      }
    } catch (error) {
      // Token is invalid or expired, clear it
      localStorage.removeItem(AUTH_TOKEN_KEY)
      dispatch(clearUser())
    }
  }
)
