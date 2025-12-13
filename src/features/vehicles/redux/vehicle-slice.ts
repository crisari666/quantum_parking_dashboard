import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Vehicle, VehicleLog } from '../types/vehicle.types'

export interface VehicleState {
  readonly vehicles: Vehicle[]
  readonly vehicleLogs: VehicleLog[]
  readonly selectedVehicle: Vehicle | null
  readonly selectedVehicleLogs: VehicleLog[]
  readonly isLoading: boolean
  readonly isLoadingLogs: boolean
  readonly error: string | null
}

const initialState: VehicleState = {
  vehicles: [],
  vehicleLogs: [],
  selectedVehicle: null,
  selectedVehicleLogs: [],
  isLoading: false,
  isLoadingLogs: false,
  error: null,
}

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload
      state.error = null
    },
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.push(action.payload)
      state.error = null
    },
    updateVehicleInList: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(v => v._id === action.payload._id)
      if (index !== -1) {
        state.vehicles[index] = action.payload
      }
      state.error = null
    },
    removeVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter(v => v._id !== action.payload)
      state.error = null
    },
    setVehicleLogs: (state, action: PayloadAction<VehicleLog[]>) => {
      state.vehicleLogs = action.payload
      state.error = null
    },
    addVehicleLog: (state, action: PayloadAction<VehicleLog>) => {
      state.vehicleLogs.push(action.payload)
      state.error = null
    },
    updateVehicleLogInList: (state, action: PayloadAction<VehicleLog>) => {
      const index = state.vehicleLogs.findIndex(log => log._id === action.payload._id)
      if (index !== -1) {
        state.vehicleLogs[index] = action.payload
      }
      state.error = null
    },
    removeVehicleLog: (state, action: PayloadAction<string>) => {
      state.vehicleLogs = state.vehicleLogs.filter(log => log._id !== action.payload)
      state.error = null
    },
    setSelectedVehicle: (state, action: PayloadAction<Vehicle | null>) => {
      state.selectedVehicle = action.payload
    },
    setSelectedVehicleLogs: (state, action: PayloadAction<VehicleLog[]>) => {
      state.selectedVehicleLogs = action.payload
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setLoadingLogs: (state, action: PayloadAction<boolean>) => {
      state.isLoadingLogs = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
      state.isLoadingLogs = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setVehicles,
  addVehicle,
  updateVehicleInList,
  removeVehicle,
  setVehicleLogs,
  addVehicleLog,
  updateVehicleLogInList,
  removeVehicleLog,
  setSelectedVehicle,
  setSelectedVehicleLogs,
  setLoading,
  setLoadingLogs,
  setError,
  clearError,
} = vehicleSlice.actions

export default vehicleSlice.reducer
