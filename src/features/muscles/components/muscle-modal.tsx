import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { createMuscle, updateMuscle, closeModal } from '../redux/muscles-slice'
import { Muscle } from '../types/muscle.types'

export const MuscleModal: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { status, isModalOpen, modalMode, selectedMuscle } = useSelector((state: RootState) => state.muscles)
  
  const [formData, setFormData] = useState({
    spanish: '',
    english: '',
    bodyPart: '',
  })

  useEffect(() => {
    if (modalMode === 'edit' && selectedMuscle) {
      setFormData({
        spanish: selectedMuscle.name,
        english: selectedMuscle.nameEnglish,
        bodyPart: selectedMuscle.bodyPart,
      })
    } else {
      setFormData({
        spanish: '',
        english: '',
        bodyPart: '',
      })
    }
  }, [modalMode, selectedMuscle, isModalOpen])

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.spanish || !formData.english || !formData.bodyPart) {
      return
    }

    const muscleData = {
      name: formData.spanish,
      nameEnglish: formData.english,
      bodyPart: formData.bodyPart,
    }

    if (modalMode === 'create') {
      await dispatch(createMuscle(muscleData) as any)
    } else if (modalMode === 'edit' && selectedMuscle) {
      await dispatch(updateMuscle({ id: selectedMuscle._id, data: muscleData }) as any)
    }

    dispatch(closeModal())
  }

  const handleClose = () => {
    setFormData({
      spanish: '',
      english: '',
      bodyPart: '',
    })
    dispatch(closeModal())
  }

  return (
    <Dialog open={isModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {modalMode === 'create' ? t('muscles.createTitle') : t('muscles.editTitle')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label={t('common.name')}
            value={formData.spanish}
            onChange={handleInputChange('spanish')}
            fullWidth
            required
          />
          <TextField
            label={t('muscles.nameEnglish')}
            value={formData.english}
            onChange={handleInputChange('english')}
            fullWidth
            required
          />
          <TextField
            label={t('muscles.bodyPart')}
            value={formData.bodyPart}
            onChange={handleInputChange('bodyPart')}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={status === 'loading'}>
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={status === 'loading' || !formData.spanish || !formData.english || !formData.bodyPart}
        >
          {status === 'loading' ? t('common.loading') : modalMode === 'create' ? t('common.create') : t('common.update')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
