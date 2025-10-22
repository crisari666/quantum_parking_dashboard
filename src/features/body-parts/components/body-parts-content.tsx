import React from 'react'
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { BodyPartsList } from './body-parts-list'

export const BodyPartsContent: React.FC = () => {
  const { status, error } = useSelector((state: RootState) => state.bodyParts)

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

  return <BodyPartsList />
}
