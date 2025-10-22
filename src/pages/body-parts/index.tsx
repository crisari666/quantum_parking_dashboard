import React from 'react'
import { Box } from '@mui/material'
import { BodyPartsHeader, BodyPartsFilter, BodyPartsContent, BodyPartModal } from '../../features/body-parts'

const BodyPartsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <BodyPartsHeader />
      <BodyPartsFilter />
      <BodyPartsContent />
      <BodyPartModal />
    </Box>
  )
}

export default BodyPartsPage
