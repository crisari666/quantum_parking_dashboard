import React from 'react'
import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { openCreateModal } from '../redux/muscles-slice'

export const MusclesHeader: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleCreateClick = () => {
    dispatch(openCreateModal())
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4" component="h1">
        {t('muscles.title')}
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleCreateClick}
        size="large"
      >
        {t('muscles.addMuscle')}
      </Button>
    </Box>
  )
}
