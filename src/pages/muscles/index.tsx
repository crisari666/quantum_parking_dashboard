import React from 'react'
import { Box } from '@mui/material'
import { MusclesHeader, MusclesFilter, MusclesList, MuscleModal } from '../../features/muscles'

const MusclesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <MusclesHeader />
      <MusclesFilter />
      <MusclesList />
      <MuscleModal />
    </Box>
  )
}

export default MusclesPage
