import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../app/createAppSlice'
import { AppThunk } from '../../app/store'
import BusinessService from './services/business.service'
import { Business, CreateBusinessDto, UpdateBusinessDto } from './types/business.types'

export type BusinessSliceState = {
  businesses: Business[]
  selectedBusiness: Business | null
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: BusinessSliceState = {
  businesses: [],
  selectedBusiness: null,
  status: 'idle',
  error: null,
}

export const businessSlice = createAppSlice({
  name: 'business',
  initialState,
  reducers: create => ({
    fetchBusinesses: create.asyncThunk(
      async () => {
        const service = BusinessService.getInstance()
        const response = await service.getAllBusinesses()
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.businesses = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch businesses'
        },
      },
    ),
    fetchAllBusinesses: create.asyncThunk(
      async () => {
        const service = BusinessService.getInstance()
        const response = await service.getAllBusinesses()
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.businesses = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch all businesses'
        },
      },
    ),
    fetchBusinessById: create.asyncThunk(
      async (id: string) => {
        const service = BusinessService.getInstance()
        const response = await service.getBusinessById(id)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.selectedBusiness = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch business'
        },
      },
    ),
    createBusiness: create.asyncThunk(
      async (businessData: CreateBusinessDto) => {
        const service = BusinessService.getInstance()
        const response = await service.createBusiness(businessData)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.businesses.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to create business'
        },
      },
    ),
    updateBusiness: create.asyncThunk(
      async ({ id, data }: { id: string; data: UpdateBusinessDto }) => {
        const service = BusinessService.getInstance()
        const response = await service.updateBusiness(id, data)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          const index = state.businesses.findIndex(b => b._id === action.payload._id)
          if (index !== -1) {
            state.businesses[index] = action.payload
          }
          if (state.selectedBusiness?._id === action.payload._id) {
            state.selectedBusiness = action.payload
          }
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to update business'
        },
      },
    ),
    deleteBusiness: create.asyncThunk(
      async (id: string) => {
        const service = BusinessService.getInstance()
        await service.deleteBusiness(id)
        return id
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.businesses = state.businesses.filter(b => b._id !== action.payload)
          if (state.selectedBusiness?._id === action.payload) {
            state.selectedBusiness = null
          }
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to delete business'
        },
      },
    ),
    setSelectedBusiness: create.reducer((state, action: PayloadAction<Business | null>) => {
      state.selectedBusiness = action.payload
    }),
    clearError: create.reducer(state => {
      state.error = null
    }),
  }),
  selectors: {
    selectBusinesses: business => business.businesses,
    selectSelectedBusiness: business => business.selectedBusiness,
    selectBusinessStatus: business => business.status,
    selectBusinessError: business => business.error,
    selectBusinessById: (business, id: string) =>
      business.businesses.find(b => b._id === id) || null,
  },
})

export const {
  fetchBusinesses,
  fetchAllBusinesses,
  fetchBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  setSelectedBusiness,
  clearError,
} = businessSlice.actions

export const {
  selectBusinesses,
  selectSelectedBusiness,
  selectBusinessStatus,
  selectBusinessError,
  selectBusinessById,
} = businessSlice.selectors

