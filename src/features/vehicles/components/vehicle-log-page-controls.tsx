import React, { useState, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Box, TextField, Button, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { FilterList as FilterIcon } from '@mui/icons-material'
import { AppDispatch } from '../../../app/store'
import { fetchVehicleLogs, fetchActiveVehicleLogs, fetchVehicleLogsByDate } from '../redux/vehicle-thunks'

type FilterType = 'all' | 'active' | 'date'

const VehicleLogPageControls: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const [filterType, setFilterType] = useState<FilterType>('active')
  const [dateFilter, setDateFilter] = useState('')

  const handleFilter = useCallback((): void => {
    if (filterType === 'active') {
      dispatch(fetchActiveVehicleLogs())
    } else if (filterType === 'date' && dateFilter) {
      dispatch(fetchVehicleLogsByDate(dateFilter))
    } else {
      dispatch(fetchVehicleLogs())
    }
  }, [filterType, dateFilter, dispatch])

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>{t('vehicles.filterType')}</InputLabel>
          <Select
            value={filterType}
            label={t('vehicles.filterType')}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
          >
            <MenuItem value="all">{t('vehicles.allLogs')}</MenuItem>
            <MenuItem value="active">{t('vehicles.activeLogs')}</MenuItem>
            <MenuItem value="date">{t('vehicles.filterByDate')}</MenuItem>
          </Select>
        </FormControl>
        {filterType === 'date' && (
          <TextField
            type="date"
            label={t('vehicles.date')}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200 }}
          />
        )}
        <Button
          variant="contained"
          startIcon={<FilterIcon />}
          onClick={handleFilter}
          disabled={filterType === 'date' && !dateFilter}
        >
          {t('vehicles.applyFilter')}
        </Button>
      </Box>
    </Paper>
  )
}

export default memo(VehicleLogPageControls)
