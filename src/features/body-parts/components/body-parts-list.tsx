import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  Switch,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { openEditModal, deleteBodyPart, updateBodyPart, fetchBodyParts } from '../redux/body-parts-slice'
import { BodyPart } from '../types/body-part.types'

export const BodyPartsList: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { bodyParts, filters } = useSelector((state: RootState) => state.bodyParts)

  useEffect(() => {
    dispatch(fetchBodyParts(filters) as any)
  }, [dispatch, filters])

  const handleEditClick = (bodyPart: BodyPart) => {
    dispatch(openEditModal(bodyPart))
  }

  const handleDeleteClick = async (bodyPart: BodyPart) => {
    if (window.confirm(t('bodyParts.deleteConfirm'))) {
      await dispatch(deleteBodyPart(bodyPart as any) as any)
    }
  }

  const handleToggleActive = async (bodyPart: BodyPart) => {
    await dispatch(updateBodyPart({ 
      id: bodyPart as any, 
      data: { isActive: !bodyPart.isActive } 
    }) as any)
  }

  if (bodyParts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {t('common.noDataFound')}
        </Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('common.name')}</TableCell>
            <TableCell>{t('bodyParts.nameEnglish')}</TableCell>
            <TableCell>{t('common.description')}</TableCell>
            <TableCell align="center">{t('common.status')}</TableCell>
            <TableCell align="center">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyParts.map((bodyPart, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {bodyPart.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {bodyPart.nameEnglish}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>
                  {bodyPart.description}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={bodyPart.isActive ? t('common.active') : t('common.inactive')}
                  size="small"
                  color={bodyPart.isActive ? 'success' : 'default'}
                  variant={bodyPart.isActive ? 'filled' : 'outlined'}
                />
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={bodyPart.isActive}
                  onChange={() => handleToggleActive(bodyPart)}
                  size="small"
                  color="primary"
                />
                <IconButton
                  size="small"
                  onClick={() => handleEditClick(bodyPart)}
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(bodyPart)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
