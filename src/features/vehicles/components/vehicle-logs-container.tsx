import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  CircularProgress,
  Box,
  Alert,
} from '@mui/material'
import { RootState } from '../../../app/store'
import VehicleLogsList from './vehicle-logs-list'

const VehicleLogsContainer: React.FC = memo(() => {
  const { t } = useTranslation()
  const { vehicleLogs, isLoadingLogs, error } = useSelector(
    (state: RootState) => state.vehicle
  )


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
