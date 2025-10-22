import React from 'react'
import { Box } from '@mui/material'
import { BodyPartsHeader, BodyPartsFilter, BodyPartsList, BodyPartModal } from '../../features/body-parts'

const BodyPartsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <BodyPartsHeader />
      <BodyPartsFilter />
      <BodyPartsList />
      <BodyPartModal />
    </Box>
  )
}

export default BodyPartsPage
