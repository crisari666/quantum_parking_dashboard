import React from 'react'
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { setFilters } from '../redux/muscles-slice'

export const MusclesFilter: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.muscles)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ bodyPart: event.target.value || undefined }))
  }

  const handleSearchSubmit = () => {
    // Trigger fetch with current filters
    dispatch({ type: 'muscles/fetchMuscles', payload: filters })
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder={t('muscles.searchPlaceholder')}
              value={filters.bodyPart || ''}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
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
