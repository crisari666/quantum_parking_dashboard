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
  FormControlLabel,
  Switch,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { createBodyPart, updateBodyPart, closeModal } from '../redux/body-parts-slice'
import { BodyPart } from '../types/body-part.types'

export const BodyPartModal: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { status, isModalOpen, modalMode, selectedBodyPart } = useSelector((state: RootState) => state.bodyParts)
  
  const [formData, setFormData] = useState({
    name: '',
    nameEnglish: '',
    description: '',
    isActive: true,
  })

  useEffect(() => {
    if (modalMode === 'edit' && selectedBodyPart) {
      setFormData({
        name: selectedBodyPart.name,
        nameEnglish: selectedBodyPart.nameEnglish,
        description: selectedBodyPart.description,
        isActive: selectedBodyPart.isActive,
      })
    } else {
      setFormData({
        name: '',
        nameEnglish: '',
        description: '',
        isActive: true,
      })
    }
  }, [modalMode, selectedBodyPart, isModalOpen])

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.nameEnglish || !formData.description) {
      return
    }

    const bodyPartData = {
      name: formData.name,
      nameEnglish: formData.nameEnglish,
      description: formData.description,
      isActive: formData.isActive,
    }

    if (modalMode === 'create') {
      await dispatch(createBodyPart(bodyPartData) as any)
    } else if (modalMode === 'edit' && selectedBodyPart) {
      await dispatch(updateBodyPart({ id: selectedBodyPart as any, data: bodyPartData }) as any)
    }

    dispatch(closeModal())
  }

  const handleClose = () => {
    setFormData({
      name: '',
      nameEnglish: '',
      description: '',
      isActive: true,
    })
    dispatch(closeModal())
  }

  return (
    <Dialog open={isModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {modalMode === 'create' ? t('bodyParts.createTitle') : t('bodyParts.editTitle')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label={t('common.name')}
            value={formData.name}
            onChange={handleInputChange('name')}
            fullWidth
            required
          />
          <TextField
            label={t('bodyParts.nameEnglish')}
            value={formData.nameEnglish}
            onChange={handleInputChange('nameEnglish')}
            fullWidth
            required
          />
          <TextField
            label={t('common.description')}
            value={formData.description}
            onChange={handleInputChange('description')}
            fullWidth
            multiline
            rows={3}
            required
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={handleSwitchChange('isActive')}
                color="primary"
              />
            }
            label={t('common.active')}
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
          disabled={status === 'loading' || !formData.name || !formData.nameEnglish || !formData.description}
        >
          {status === 'loading' ? t('common.loading') : modalMode === 'create' ? t('common.create') : t('common.update')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
