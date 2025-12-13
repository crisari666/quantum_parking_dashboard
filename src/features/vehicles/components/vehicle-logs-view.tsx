import React from 'react'
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
  Chip,
} from '@mui/material'
import { RootState } from '../../../app/store'
import { VehicleLog, Vehicle } from '../types/vehicle.types'
import VehicleLogPageControls from './vehicle-log-page-controls'

const VehicleLogsView: React.FC = () => {
  const { t } = useTranslation()
  const { vehicleLogs, isLoadingLogs, error } = useSelector(
    (state: RootState) => state.vehicle
  )

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString()
  }

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getVehiclePlateNumber = (vehicleId: string | Vehicle): string => {
    if (typeof vehicleId === 'object' && vehicleId !== null) {
      return vehicleId.plateNumber
    }
    return '-'
  }

  const getVehicleType = (vehicleId: string | Vehicle): string => {
    if (typeof vehicleId === 'object' && vehicleId !== null) {
      return vehicleId.vehicleType
    }
    return '-'
  }

  if (isLoadingLogs) {
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
        {t('vehicles.vehicleLogsTitle')}
      </Typography>

      <VehicleLogPageControls />

      {vehicleLogs.length === 0 ? (
        <Box mt={2}>
          <Alert severity="info">{t('vehicles.noVehicleLogsFound')}</Alert>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('vehicles.plateNumber')}</TableCell>
                <TableCell>{t('vehicles.vehicleType')}</TableCell>
                <TableCell>{t('vehicles.entryTime')}</TableCell>
                <TableCell>{t('vehicles.exitTime')}</TableCell>
                <TableCell>{t('vehicles.duration')}</TableCell>
                <TableCell>{t('vehicles.cost')}</TableCell>
                <TableCell>{t('vehicles.hasMembership')}</TableCell>
                <TableCell>{t('vehicles.status')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicleLogs.map((log: VehicleLog) => (
                <TableRow key={log._id}>
                  <TableCell>{getVehiclePlateNumber(log.vehicleId)}</TableCell>
                  <TableCell>
                    <Chip
                      label={getVehicleType(log.vehicleId)}
                      size="small"
                      color={getVehicleType(log.vehicleId) === 'car' ? 'primary' : 'secondary'}
                    />
                  </TableCell>
                  <TableCell>{formatDate(log.entryTime)}</TableCell>
                  <TableCell>
                    {log.exitTime ? formatDate(log.exitTime) : '-'}
                  </TableCell>
                  <TableCell>{formatDuration(log.duration)}</TableCell>
                  <TableCell>${log.cost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.hasMembership ? t('common.yes') : t('common.no')}
                      color={log.hasMembership ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={log.exitTime ? t('vehicles.completed') : t('vehicles.inParking')}
                      color={log.exitTime ? 'default' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default VehicleLogsView
