import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import { AppDispatch } from '../../../app/store'
import { fetchBusinesses, selectBusinesses, selectBusinessStatus, selectBusinessError } from '../businessSlice'
import { Business } from '../types/business.types'

const BusinessesList: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const businesses = useSelector(selectBusinesses)
  const status = useSelector(selectBusinessStatus)
  const error = useSelector(selectBusinessError)

  useEffect(() => {
    dispatch(fetchBusinesses())
  }, [dispatch])

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (businesses.length === 0) {
    return (
      <Box mt={2}>
        <Alert severity="info">{t('business.noBusinessesFound')}</Alert>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('business.businessName')}</TableCell>
            <TableCell>{t('business.businessBrand')}</TableCell>
            <TableCell>{t('business.address')}</TableCell>
            <TableCell>{t('business.schedule')}</TableCell>
            <TableCell align="center">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {businesses.map((business: Business) => (
            <TableRow key={business._id}>
              <TableCell>{business.businessName}</TableCell>
              <TableCell>{business.businessBrand}</TableCell>
              <TableCell>{business.address}</TableCell>
              <TableCell>{business.schedule}</TableCell>
              <TableCell align="center">
                {/* Actions will be added later */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BusinessesList

