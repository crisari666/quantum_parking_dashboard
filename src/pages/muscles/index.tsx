import React from 'react'
import { Box } from '@mui/material'
import { MusclesHeader, MusclesFilter, MusclesContent, MuscleModal } from '../../features/muscles'

const MusclesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <MusclesHeader />
      <MusclesFilter />
      <MusclesContent />
      <MuscleModal />
    </Box>
  )
}

export default MusclesPage
