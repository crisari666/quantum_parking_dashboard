import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Box, TextField, Button, Paper } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { AppDispatch } from '../../../app/store'
import { findVehicleByPlate } from '../redux/vehicle-thunks'

const VehiclePageControls: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const [plateNumber, setPlateNumber] = useState('')

  const handleSearch = (): void => {
    if (plateNumber.trim()) {
      dispatch(findVehicleByPlate(plateNumber.trim().toUpperCase()))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <TextField
          label={t('vehicles.plateNumber')}
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('vehicles.plateNumberPlaceholder')}
          size="small"
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          disabled={!plateNumber.trim()}
        >
          {t('common.search')}
        </Button>
      </Box>
    </Paper>
  )
}

export default VehiclePageControls
