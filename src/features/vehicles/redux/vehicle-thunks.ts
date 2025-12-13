import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../app/store'
import {
  setVehicles,
  setVehicleLogs,
  setSelectedVehicle,
  setSelectedVehicleLogs,
  setLoading,
  setLoadingLogs,
  setError,
  clearError,
  updateVehicleInList,
  updateVehicleLogInList,
} from './vehicle-slice'
import VehicleService from '../services/vehicle.service'
import VehicleLogService from '../services/vehicle-log.service'
import {
  CreateVehicleRequest,
  UpdateVehicleRequest,
  SetParkingStatusRequest,
  CreateVehicleLogRequest,
  UpdateVehicleLogRequest,
  CheckoutVehicleRequest,
} from '../types/vehicle.types'

export const fetchVehicles = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/fetchVehicles', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const vehicleService = VehicleService.getInstance()
    const vehicles = await vehicleService.getAllVehicles()
    
    dispatch(setVehicles(vehicles))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch vehicles'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const fetchActiveVehicles = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/fetchActiveVehicles', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const vehicleService = VehicleService.getInstance()
    const vehicles = await vehicleService.getActiveVehicles()
    
    dispatch(setVehicles(vehicles))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch active vehicles'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const findVehicleByPlate = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/findVehicleByPlate', async (plateNumber, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const vehicleService = VehicleService.getInstance()
    const vehicle = await vehicleService.findVehicleByPlateNumber(plateNumber)

    console.log({vehicle})
    
    dispatch(setSelectedVehicle(vehicle))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to find vehicle'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const createVehicle = createAsyncThunk<
  void,
  CreateVehicleRequest,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/createVehicle', async (vehicleData, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const vehicleService = VehicleService.getInstance()
    await vehicleService.createVehicle(vehicleData)
    
    dispatch(fetchVehicles())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create vehicle'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const updateVehicle = createAsyncThunk<
  void,
  { id: string; data: UpdateVehicleRequest },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/updateVehicle', async ({ id, data }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const vehicleService = VehicleService.getInstance()
    const updatedVehicle = await vehicleService.updateVehicle(id, data)
    
    dispatch(updateVehicleInList(updatedVehicle))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update vehicle'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const setParkingStatus = createAsyncThunk<
  void,
  { plateNumber: string; data: SetParkingStatusRequest },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/setParkingStatus', async ({ plateNumber, data }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const vehicleService = VehicleService.getInstance()
    const updatedVehicle = await vehicleService.setParkingStatus(plateNumber, data)
    
    dispatch(updateVehicleInList(updatedVehicle))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to set parking status'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const deleteVehicle = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/deleteVehicle', async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    const vehicleService = VehicleService.getInstance()
    await vehicleService.deleteVehicle(id)
    
    dispatch(fetchVehicles())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete vehicle'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoading(false))
  }
})

export const fetchVehicleLogs = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/fetchVehicleLogs', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    const logs = await vehicleLogService.getAllVehicleLogs()
    
    dispatch(setVehicleLogs(logs))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch vehicle logs'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})

export const fetchActiveVehicleLogs = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/fetchActiveVehicleLogs', async (_, { dispatch, getState }) => {
  const state = getState()
  if (state.vehicle.isLoadingLogs) {
    return
  }
  
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    const logs = await vehicleLogService.getActiveVehicleLogs()
    
    dispatch(setVehicleLogs(logs))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch active vehicle logs'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})

export const fetchVehicleLogsByPlate = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/fetchVehicleLogsByPlate', async (plateNumber, { dispatch }) => {
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    const logs = await vehicleLogService.getVehicleLogsByPlateNumber(plateNumber)
    
    dispatch(setSelectedVehicleLogs(logs))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch vehicle logs'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})

export const fetchVehicleLogsByDate = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/fetchVehicleLogsByDate', async (date, { dispatch }) => {
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    const logs = await vehicleLogService.getVehicleLogsByDate(date)
    
    dispatch(setVehicleLogs(logs))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch vehicle logs by date'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})

export const createVehicleLog = createAsyncThunk<
  void,
  CreateVehicleLogRequest,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/createVehicleLog', async (logData, { dispatch }) => {
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    await vehicleLogService.createVehicleLog(logData)
    
    dispatch(fetchActiveVehicleLogs())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create vehicle log'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})

export const updateVehicleLog = createAsyncThunk<
  void,
  { id: string; data: UpdateVehicleLogRequest },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/updateVehicleLog', async ({ id, data }, { dispatch }) => {
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    const updatedLog = await vehicleLogService.updateVehicleLog(id, data)
    
    dispatch(updateVehicleLogInList(updatedLog))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update vehicle log'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})

export const checkoutVehicle = createAsyncThunk<
  void,
  { plateNumber: string; data: CheckoutVehicleRequest },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/checkoutVehicle', async ({ plateNumber, data }, { dispatch }) => {
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    const updatedLog = await vehicleLogService.checkoutVehicle(plateNumber, data)
    
    dispatch(updateVehicleLogInList(updatedLog))
    dispatch(fetchActiveVehicleLogs())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to checkout vehicle'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})

export const deleteVehicleLog = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('vehicle/deleteVehicleLog', async (id, { dispatch }) => {
  try {
    dispatch(setLoadingLogs(true))
    dispatch(clearError())
    
    const vehicleLogService = VehicleLogService.getInstance()
    await vehicleLogService.deleteVehicleLog(id)
    
    dispatch(fetchVehicleLogs())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete vehicle log'
    dispatch(setError(errorMessage))
  } finally {
    dispatch(setLoadingLogs(false))
  }
})
