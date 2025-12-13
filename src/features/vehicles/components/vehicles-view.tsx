import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import { History as HistoryIcon } from '@mui/icons-material'
import { RootState } from '../../../app/store'
import { Vehicle } from '../types/vehicle.types'
import VehiclePageControls from './vehicle-page-controls'
import VehicleLogHistoryModal from './vehicle-log-history-modal'
import { fetchVehicleLogsByPlate } from '../redux/vehicle-thunks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'

const VehiclesView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedVehicle, selectedVehicleLogs, isLoading, error } = useSelector(
    (state: RootState) => state.vehicle
  )
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)

  const handleViewLogs = (plateNumber: string): void => {
    dispatch(fetchVehicleLogsByPlate(plateNumber))
    setIsLogModalOpen(true)
  }

  const handleCloseLogModal = (): void => {
    setIsLogModalOpen(false)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString()
  }

  if (isLoading) {
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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('vehicles.title')}
      </Typography>

      <VehiclePageControls />

      {selectedVehicle ? (
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
                <TableCell align="center">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{selectedVehicle.plateNumber}</TableCell>
                <TableCell>
                  <Chip
                    label={selectedVehicle.vehicleType}
                    size="small"
                    color={selectedVehicle.vehicleType === 'car' ? 'primary' : 'secondary'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={selectedVehicle.inParking ? t('vehicles.inParking') : t('vehicles.notInParking')}
                    color={selectedVehicle.inParking ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(selectedVehicle.lastLog)}</TableCell>
                <TableCell>{selectedVehicle.userName || '-'}</TableCell>
                <TableCell>{selectedVehicle.phone || '-'}</TableCell>
                <TableCell align="center">
                  <Tooltip title={t('vehicles.viewLogHistory')}>
                    <IconButton
                      onClick={() => handleViewLogs(selectedVehicle.plateNumber)}
                      color="primary"
                    >
                      <HistoryIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box mt={2}>
          <Alert severity="info">{t('vehicles.searchVehicleMessage')}</Alert>
        </Box>
      )}

      <VehicleLogHistoryModal
        isOpen={isLogModalOpen}
        onClose={handleCloseLogModal}
        logs={selectedVehicleLogs}
        plateNumber={selectedVehicle?.plateNumber || ''}
      />
    </Box>
  )
}

export default VehiclesView
