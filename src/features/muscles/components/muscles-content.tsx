import React from 'react'
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { MusclesList } from './muscles-list'

export const MusclesContent: React.FC = () => {
  const { status, error } = useSelector((state: RootState) => state.muscles)

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  return <MusclesList />
}
