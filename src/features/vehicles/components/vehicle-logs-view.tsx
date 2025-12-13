import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
} from '@mui/material'
import VehicleLogPageControls from './vehicle-log-page-controls'
import VehicleLogsContainer from './vehicle-logs-container'

const VehicleLogsView: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('vehicles.vehicleLogsTitle')}
      </Typography>

      <VehicleLogPageControls />

      <VehicleLogsContainer />
    </Box>
  )
}

export default VehicleLogsView
