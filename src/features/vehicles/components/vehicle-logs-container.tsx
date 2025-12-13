import React, { useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Alert,
  CircularProgress,
} from '@mui/material'
import { RootState, AppDispatch } from '../../../app/store'
import { fetchActiveVehicleLogs } from '../redux/vehicle-thunks'
import VehicleLogsList from './vehicle-logs-list'

const VehicleLogsContainer: React.FC = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { vehicleLogs, isLoadingLogs, error } = useSelector(
    (state: RootState) => state.vehicle
  )
  useEffect(() => {
    dispatch(fetchActiveVehicleLogs())
  }, [dispatch])

  if (isLoadingLogs) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (vehicleLogs.length === 0) {
    return (
      <Box mt={2}>
        <Alert severity="info">{t('vehicles.noVehicleLogsFound')}</Alert>
      </Box>
    )
  }

  return <VehicleLogsList logs={vehicleLogs} />
})

VehicleLogsContainer.displayName = 'VehicleLogsContainer'

export default VehicleLogsContainer
