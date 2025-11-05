import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User } from '../types/auth.types'
import { Business } from '../../business/types/business.types'

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  business: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string; business?: Business | null }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      if (action.payload.business !== undefined) {
        state.business = action.payload.business
      }
    },
    setBusiness: (state, action: PayloadAction<Business | null>) => {
      state.business = action.payload
    },
    clearUser: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      state.business = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      state.isLoading = false
      state.business = null
    },
  },
})

export const { 
  setUser, 
  setBusiness,
  clearUser, 
  setLoading, 
  setError, 
  clearError,
  logout
} = authSlice.actions

export default authSlice.reducer
