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
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { openEditModal, deleteMuscle, fetchMuscles } from '../redux/muscles-slice'
import { fetchBodyParts } from '../../body-parts/redux/body-parts-slice'
import { Muscle } from '../types/muscle.types'
import { BodyPart } from '../../body-parts/types/body-part.types'

export const MusclesList: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { muscles, filters } = useSelector((state: RootState) => state.muscles)
  const { bodyParts } = useSelector((state: RootState) => state.bodyParts)

  useEffect(() => {
    dispatch(fetchMuscles(filters) as any)
  }, [dispatch, filters])

  useEffect(() => {
    // Fetch body parts if not already loaded
    if (bodyParts.length === 0) {
      dispatch(fetchBodyParts() as any)
    }
  }, [dispatch, bodyParts.length])

  const handleEditClick = (muscle: Muscle) => {
    dispatch(openEditModal(muscle))
  }

  const handleDeleteClick = async (muscle: Muscle) => {
    if (window.confirm(t('muscles.deleteConfirm'))) {
      await dispatch(deleteMuscle(muscle._id) as any)
    }
  }

  // Function to resolve body part name
  const getBodyPartName = (bodyPartId: string): string => {
    const bodyPart = bodyParts.find(bp => bp.name === bodyPartId || bp.nameEnglish === bodyPartId)
    if (bodyPart) {
      return bodyPart.nameEnglish || bodyPart.name
    }
    
    return bodyPartId // Fallback to the original ID
  }
  if (muscles.length === 0) {
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
            <TableCell>{t('muscles.nameEnglish')}</TableCell>
            <TableCell>{t('muscles.bodyPart')}</TableCell>
            <TableCell align="center">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {muscles.map((muscle, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {muscle.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {muscle.nameEnglish}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getBodyPartName(muscle.bodyPart)}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  onClick={() => handleEditClick(muscle)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(muscle)}
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
