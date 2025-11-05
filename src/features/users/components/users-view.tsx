import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Alert, 
  Box, 
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Block as BlockIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import { AppDispatch, RootState } from '../../../app/store'
import { fetchUsers, updateUserStatus } from '../redux/users-slice'
import { User } from '../types/user.types'

const UsersView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { enqueueSnackbar } = useSnackbar()
  const { users, status, error } = useSelector((state: RootState) => state.users)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleAddUser = (): void => {
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = (): void => {
    setIsCreateModalOpen(false)
  }

  const handleToggleUserStatus = async (user: User): Promise<void> => {
    try {
      await dispatch(updateUserStatus({ id: user._id, enabled: !user.enabled })).unwrap()
      enqueueSnackbar(
        user.enabled 
          ? t('users.disableSuccess') 
          : t('users.enableSuccess'), 
        { variant: 'success' }
      )
    } catch (err: any) {
      enqueueSnackbar(
        err?.message || t('users.updateStatusError'), 
        { variant: 'error' }
      )
    }
  }

  const isLoading = status === 'loading'

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
        {t('users.title')}
      </Typography>
      
      <Box mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          {t('users.addUser')}
        </Button>
      </Box>
      
      {users.length === 0 ? (
        <Box mt={2}>
          <Alert severity="info">{t('users.noUsersFound')}</Alert>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('common.name')}</TableCell>
                <TableCell>{t('common.email')}</TableCell>
                <TableCell>{t('users.role')}</TableCell>
                <TableCell>{t('users.business')}</TableCell>
                <TableCell align="center">{t('common.status')}</TableCell>
                <TableCell align="center">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell>
                    {user.name} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'admin' ? 'error' : user.role === 'user' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.business || '-'}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={user.enabled ? t('common.active') : t('common.inactive')} 
                      color={user.enabled ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Tooltip title={user.enabled ? t('users.disable') : t('users.enable')}>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleUserStatus(user)}
                          color={user.enabled ? 'error' : 'success'}
                        >
                          {user.enabled ? <BlockIcon /> : <CheckCircleIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>
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

export default UsersView

