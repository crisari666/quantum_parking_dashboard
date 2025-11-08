import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

const BusinessesControls: React.FC = () => {
  const { t } = useTranslation()

  const handleAddBusiness = (): void => {
    // TODO: Implement add business modal
  }

  return (
    <Box mb={2}>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddBusiness}>
        {t('business.addBusiness')}
      </Button>
    </Box>
  )
}

export default BusinessesControls

