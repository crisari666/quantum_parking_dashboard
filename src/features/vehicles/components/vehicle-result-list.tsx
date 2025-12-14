import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import { History as HistoryIcon, DirectionsCar as CarIcon, TwoWheeler as MotorcycleIcon } from '@mui/icons-material'
import { RootState, AppDispatch } from '../../../app/store'
import { fetchVehicleLogsByPlate } from '../redux/vehicle-thunks'
import VehicleLogHistoryModal from './vehicle-log-history-modal'

const VehicleResultList: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { findResults, isLoadingFind, error, selectedVehicleLogs } = useSelector(
    (state: RootState) => state.vehicle
  )
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [selectedPlateNumber, setSelectedPlateNumber] = useState('')

  const handleViewLogs = (plateNumber: string): void => {
    setSelectedPlateNumber(plateNumber)
    dispatch(fetchVehicleLogsByPlate(plateNumber))
    setIsLogModalOpen(true)
  }

  const handleCloseLogModal = (): void => {
    setIsLogModalOpen(false)
    setSelectedPlateNumber('')
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString()
  }

  if (isLoadingFind) {
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

  if (findResults.length === 0) {
    return (
      <Box mt={2}>
        <Alert severity="info">{t('vehicles.noVehiclesFound')}</Alert>
      </Box>
    )
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('vehicles.plateNumber')}</TableCell>
              <TableCell>{t('vehicles.vehicleType')}</TableCell>
              <TableCell>{t('vehicles.inParking')}</TableCell>
              <TableCell>{t('vehicles.lastLog')}</TableCell>
              <TableCell>{t('vehicles.userName')}</TableCell>
              <TableCell>{t('vehicles.phone')}</TableCell>
              <TableCell>{t('vehicles.business')}</TableCell>
              <TableCell>{t('vehicles.createdAt')}</TableCell>
              <TableCell align="center">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {findResults.map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>{vehicle.plateNumber}</TableCell>
                <TableCell>
                  <Tooltip title={t(`vehicles.vehicleTypeLabels.${vehicle.vehicleType}`)}>
                    <Box display="inline-flex" alignItems="center" justifyContent="center">
                      {vehicle.vehicleType === 'car' ? (
                        <CarIcon color="primary" />
                      ) : (
                        <MotorcycleIcon color="secondary" />
                      )}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.inParking ? t('vehicles.inParking') : t('vehicles.notInParking')}
                    color={vehicle.inParking ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(vehicle.lastLog)}</TableCell>
                <TableCell>{vehicle.userName || '-'}</TableCell>
                <TableCell>{vehicle.phone || '-'}</TableCell>
                <TableCell>{vehicle.business?.businessName || '-'}</TableCell>
                <TableCell>{formatDate(vehicle.createdAt)}</TableCell>
                <TableCell align="center">
                  <Tooltip title={t('vehicles.viewLogHistory')}>
                    <IconButton
                      onClick={() => handleViewLogs(vehicle.plateNumber)}
                      color="primary"
                    >
                      <HistoryIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <VehicleLogHistoryModal
        isOpen={isLogModalOpen}
        onClose={handleCloseLogModal}
        logs={selectedVehicleLogs}
        plateNumber={selectedPlateNumber}
      />
    </Box>
  )
}

export default VehicleResultList
