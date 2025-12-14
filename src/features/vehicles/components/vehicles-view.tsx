import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import VehiclePageControls from './vehicle-page-controls'
import VehicleResultList from './vehicle-result-list'

const VehiclesView: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('vehicles.title')}
      </Typography>

      <VehiclePageControls />

      <VehicleResultList />
    </Box>
  )
}

export default VehiclesView
