import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../../app/createAppSlice'
import { AppThunk } from '../../../app/store'
import UsersService from '../services/users.service'
import { User, UserRoleType } from '../types/user.types'

export type UsersSliceState = {
  readonly users: User[]
  readonly status: 'idle' | 'loading' | 'failed'
  readonly error: string | null
}

const initialState: UsersSliceState = {
  users: [],
  status: 'idle',
  error: null,
}

const usersService = UsersService.getInstance()

export const usersSlice = createAppSlice({
  name: 'users',
  initialState,
  reducers: create => ({
    fetchUsers: create.asyncThunk(
      async () => {
        const response = await usersService.getAllUsers()
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.users = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch users'
        },
      },
    ),
    fetchUsersByBusiness: create.asyncThunk(
      async (businessId: string) => {
        const response = await usersService.getUsersByBusiness(businessId)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.users = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch users by business'
        },
      },
    ),
    fetchUsersByMyBusiness: create.asyncThunk(
      async () => {
        const response = await usersService.getUsersByMyBusiness()
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.users = action.payload
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to fetch users by my business'
        },
      },
    ),
    createUser: create.asyncThunk(
      async (userData: { user: string; password: string }) => {
        const response = await usersService.createUser(userData)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.users.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to create user'
        },
      },
    ),
    createUserByUser: create.asyncThunk(
      async (userData: { email: string; password: string }) => {
        const response = await usersService.createUserByUser(userData)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.users.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to create user'
        },
      },
    ),
    updateUser: create.asyncThunk(
      async (params: { id: string; data: { user?: string; password?: string; role?: UserRoleType } }) => {
        const response = await usersService.updateUser(params.id, params.data)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          const index = state.users.findIndex(user => user._id === action.payload._id)
          if (index !== -1) {
            state.users[index] = action.payload
          }
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to update user'
        },
      },
    ),
    updateUserRole: create.asyncThunk(
      async (params: { id: string; role: UserRoleType }) => {
        const response = await usersService.updateUserRole(params.id, { role: params.role })
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          const index = state.users.findIndex(user => user._id === action.payload._id)
          if (index !== -1) {
            state.users[index] = action.payload
          }
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to update user role'
        },
      },
    ),
    updateUserStatus: create.asyncThunk(
      async (params: { id: string; enabled: boolean }) => {
        const response = await usersService.updateUserStatus(params.id, { enabled: params.enabled })
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          const index = state.users.findIndex(user => user._id === action.payload._id)
          if (index !== -1) {
            state.users[index] = action.payload
          }
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message || 'Failed to update user status'
        },
      },
    ),
    clearError: create.reducer(state => {
      state.error = null
    }),
  }),
  selectors: {
    selectUsers: users => users.users,
    selectStatus: users => users.status,
    selectError: users => users.error,
  },
})

export const {
  fetchUsers,
  fetchUsersByBusiness,
  fetchUsersByMyBusiness,
  createUser,
  createUserByUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
  clearError,
} = usersSlice.actions

export const { selectUsers, selectStatus, selectError } = usersSlice.selectors

