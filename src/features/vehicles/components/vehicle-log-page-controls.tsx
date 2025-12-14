import React, { useState, memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { FilterList as FilterIcon } from '@mui/icons-material'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchVehicleLogsByDate, fetchVehicleLogsByFilter } from '../redux/vehicle-thunks'
import { selectBusinesses, fetchBusinesses } from '../../business/businessSlice'

const VehicleLogPageControls: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const businesses = useSelector(selectBusinesses)
  const user = useSelector((state: RootState) => state.auth.user)
  const isAdmin = user?.role === 'admin'
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('')

  console.log('Render VehicleLogPageControls')

  // Set default to current day for non-admin users only
  useEffect(() => {
    if (!isAdmin) {
      const today = new Date().toISOString().split('T')[0]
      setDateFilter(today)
      // Automatically fetch logs for current day
      dispatch(fetchVehicleLogsByDate(today))
    }
    // Admin users don't fetch any services by default
  }, [dispatch, isAdmin])

  // Fetch businesses on demand when admin opens the dropdown
  const handleBusinessDropdownOpen = useCallback((): void => {
    if (isAdmin && businesses.length === 0) {
      dispatch(fetchBusinesses())
    }
  }, [isAdmin, businesses.length, dispatch])

  // Format date to API format: "YYYY-MM-DD HH:mm:ss"
  const formatDateForAPI = (dateString: string, isStart: boolean): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const time = isStart ? '00:00:00' : '23:59:59'
    return `${year}-${month}-${day} ${time}`
  }

  const handleFilter = useCallback((): void => {
    if (isAdmin) {
      // Admin users use the filter endpoint
      if (dateStart && dateEnd && selectedBusinessId) {
        const filterData = {
          dateStart: formatDateForAPI(dateStart, true),
          dateEnd: formatDateForAPI(dateEnd, false),
          businessId: selectedBusinessId,
        }
        dispatch(fetchVehicleLogsByFilter(filterData))
      }
    } else {
      // Non-admin users use getVehicleLogsByDate (defaults to current day)
      if (dateFilter) {
        dispatch(fetchVehicleLogsByDate(dateFilter))
      }
    }
  }, [dateStart, dateEnd, dateFilter, selectedBusinessId, dispatch, isAdmin])

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        {isAdmin ? (
          <>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>{t('vehicles.business')}</InputLabel>
              <Select
                value={selectedBusinessId}
                label={t('vehicles.business')}
                onChange={(e) => setSelectedBusinessId(e.target.value)}
                onOpen={handleBusinessDropdownOpen}
              >
                {businesses.map((business) => (
                  <MenuItem key={business._id} value={business._id}>
                    {business.businessName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="date"
              label={t('vehicles.dateStart')}
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 200 }}
            />
            <TextField
              type="date"
              label={t('vehicles.dateEnd')}
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 200 }}
            />
          </>
        ) : (
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
          disabled={isAdmin ? !(dateStart && dateEnd && selectedBusinessId) : !dateFilter}
        >
          {t('vehicles.applyFilter')}
        </Button>
      </Box>
    </Paper>
  )
}

export default memo(VehicleLogPageControls)
