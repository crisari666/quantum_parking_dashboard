import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material'
import { VehicleLog } from '../types/vehicle.types'

type VehicleLogHistoryModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly logs: VehicleLog[]
  readonly plateNumber: string
  readonly isLoading?: boolean
}

const VehicleLogHistoryModal: React.FC<VehicleLogHistoryModalProps> = ({
  isOpen,
  onClose,
  logs,
  plateNumber,
  isLoading = false,
}) => {
  const { t } = useTranslation()

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

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {t('vehicles.logHistory')} - {plateNumber}
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : logs.length === 0 ? (
          <Box p={2}>
            <Typography>{t('vehicles.noLogsFound')}</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('vehicles.entryTime')}</TableCell>
                  <TableCell>{t('vehicles.exitTime')}</TableCell>
                  <TableCell>{t('vehicles.duration')}</TableCell>
                  <TableCell>{t('vehicles.cost')}</TableCell>
                  <TableCell>{t('vehicles.hasMembership')}</TableCell>
                  <TableCell>{t('vehicles.status')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log._id}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VehicleLogHistoryModal
