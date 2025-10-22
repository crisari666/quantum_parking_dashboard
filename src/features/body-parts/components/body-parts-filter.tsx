import React from 'react'
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { setFilters } from '../redux/body-parts-slice'

export const BodyPartsFilter: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.bodyParts)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ ...filters, name: event.target.value || undefined }))
  }

  const handleStatusFilterChange = (event: any) => {
    const statusValue = event.target.value
    const newFilters = { ...filters }
    if (statusValue === 'all') {
      delete newFilters.active
    } else {
      newFilters.active = statusValue === 'active'
    }
    dispatch(setFilters(newFilters))
  }

  const handleSearchSubmit = () => {
    // Trigger fetch with current filters
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder={t('bodyParts.searchPlaceholder')}
              value={filters.name || ''}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>{t('common.status')}</InputLabel>
              <Select
                value={filters.active === undefined ? 'all' : filters.active ? 'active' : 'inactive'}
                label={t('common.status')}
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">{t('common.all')}</MenuItem>
                <MenuItem value="active">{t('common.active')}</MenuItem>
                <MenuItem value="inactive">{t('common.inactive')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="outlined"
              onClick={handleSearchSubmit}
              fullWidth
              sx={{ height: '56px' }}
            >
              {t('common.search')}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
