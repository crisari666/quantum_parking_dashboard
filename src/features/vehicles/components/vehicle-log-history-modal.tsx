import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
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
  IconButton,
  Tooltip,
  Dialog as ConfirmDialog,
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import { AppDispatch, RootState } from '../../../app/store'
import { deleteVehicleLogAdmin } from '../redux/vehicle-thunks'
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
  const dispatch = useDispatch<AppDispatch>()
  const { enqueueSnackbar } = useSnackbar()
  const user = useSelector((state: RootState) => state.auth.user)
  const isLoadingLogs = useSelector((state: RootState) => state.vehicle.isLoadingLogs)
  const canDelete = user?.role === 'admin' || user?.role === 'user'
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [logToDelete, setLogToDelete] = useState<string | null>(null)

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

  const handleDeleteClick = (logId: string): void => {
    setLogToDelete(logId)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!logToDelete) return

    try {
      await dispatch(deleteVehicleLogAdmin(logToDelete)).unwrap()
      enqueueSnackbar(t('vehicles.deleteLogSuccess'), { variant: 'success' })
      setDeleteConfirmOpen(false)
      setLogToDelete(null)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('vehicles.deleteLogError')
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

  const handleDeleteCancel = (): void => {
    setDeleteConfirmOpen(false)
    setLogToDelete(null)
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
                  {canDelete && <TableCell align="center">{t('common.actions')}</TableCell>}
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
                    {canDelete && (
                      <TableCell align="center">
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            onClick={() => handleDeleteClick(log._id)}
                            color="error"
                            size="small"
                            disabled={isLoadingLogs}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
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

      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-confirm-dialog-title"
      >
        <DialogTitle id="delete-confirm-dialog-title">
          {t('common.confirmDelete')}
        </DialogTitle>
        <DialogContent>
          <Typography>{t('vehicles.deleteLogConfirm')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isLoadingLogs}>
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isLoadingLogs}
          >
            {t('common.delete')}
          </Button>
        </DialogActions>
      </ConfirmDialog>
    </Dialog>
  )
}

export default VehicleLogHistoryModal
