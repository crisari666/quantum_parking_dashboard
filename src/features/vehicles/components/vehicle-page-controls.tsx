import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { FilterList as FilterIcon } from '@mui/icons-material'
import { AppDispatch, RootState } from '../../../app/store'
import { findVehicle, findVehicleByPlateForResults } from '../redux/vehicle-thunks'
import { selectBusinesses, fetchBusinesses } from '../../business/businessSlice'

const VehiclePageControls: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const businesses = useSelector(selectBusinesses)
  const user = useSelector((state: RootState) => state.auth.user)
  const isAdmin = user?.role === 'admin'
  const [plateNumber, setPlateNumber] = useState('')
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('')

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchBusinesses())
    }
  }, [dispatch, isAdmin])

  const handleFilter = useCallback((): void => {
    if (isAdmin) {
      dispatch(findVehicle({
        plateNumber: plateNumber.trim() || '',
        business: selectedBusinessId || '',
      }))
    } else {
      const trimmedPlate = plateNumber.trim()
      if (trimmedPlate) {
        dispatch(findVehicleByPlateForResults(trimmedPlate))
      }
    }
  }, [plateNumber, selectedBusinessId, dispatch, isAdmin])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleFilter()
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
        {isAdmin && (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>{t('vehicles.filterByBusiness')}</InputLabel>
            <Select
              value={selectedBusinessId}
              label={t('vehicles.filterByBusiness')}
              onChange={(e) => setSelectedBusinessId(e.target.value)}
            >
              <MenuItem value="">{t('common.all')}</MenuItem>
              {businesses.map((business) => (
                <MenuItem key={business._id} value={business._id}>
                  {business.businessName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button
          variant="contained"
          startIcon={<FilterIcon />}
          onClick={handleFilter}
        >
          {t('vehicles.applyFilter')}
        </Button>
      </Box>
    </Paper>
  )
}

export default VehiclePageControls
