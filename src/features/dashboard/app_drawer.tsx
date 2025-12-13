import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import HistoryIcon from '@mui/icons-material/History'
import LogoutIcon from '@mui/icons-material/Logout'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../auth/redux/auth-thunks'
import { ThemeToggle } from '../../app/theme'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../app/store'

const DRAWER_WIDTH = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  readonly open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

interface NavigationItem {
  readonly text: string
  readonly icon: React.ReactElement
  readonly path: string
  readonly allowedRoles: readonly ('admin' | 'user' | 'worker')[]
}

const getAllNavigationItems = (t: (key: string) => string): NavigationItem[] => [
  { text: t('navigation.dashboard'), icon: <HomeIcon />, path: '/dashboard', allowedRoles: ['admin', 'user', 'worker'] },
  { text: t('navigation.customers'), icon: <PersonIcon />, path: '/dashboard/customer', allowedRoles: ['admin'] },
  // { text: t('navigation.agent'), icon: <SmartToyIcon />, path: '/dashboard/agent', allowedRoles: ['admin', 'user', 'worker'] },
  { text: t('navigation.business'), icon: <BusinessIcon />, path: '/dashboard/business', allowedRoles: ['admin', 'user'] },
  { text: t('navigation.users'), icon: <PeopleIcon />, path: '/dashboard/users', allowedRoles: ['admin', 'user'] },
  { text: t('navigation.vehicles'), icon: <DirectionsCarIcon />, path: '/dashboard/vehicles', allowedRoles: ['admin', 'user'] },
  { text: t('navigation.vehicleLogs'), icon: <HistoryIcon />, path: '/dashboard/vehicle-logs', allowedRoles: ['admin', 'user'] },
]

const getNavigationItems = (t: (key: string) => string, userRole?: 'admin' | 'user' | 'worker'): NavigationItem[] => {
  const allItems = getAllNavigationItems(t)
  if (!userRole) {
    return allItems.filter((item) => item.path === '/dashboard')
  }
  return allItems.filter((item) => item.allowedRoles.includes(userRole))
}

export default function AppDrawer(): React.ReactElement {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const userRole = useSelector((state: RootState) => state.auth.user?.role)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleDrawerOpen = (): void => {
    setIsOpen(true)
  }

  const handleDrawerClose = (): void => {
    setIsOpen(false)
  }

  const handleNavigate = (path: string): void => {
    navigate(path)
  }

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(signOut() as any).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const isActiveRoute = (path: string): boolean => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname === path
  }

  const renderNavigationItems = (): React.ReactElement[] => {
    const items = getNavigationItems(t, userRole)
    return items.map((item) => (
      <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          selected={isActiveRoute(item.path)}
          onClick={() => handleNavigate(item.path)}
          sx={{
            minHeight: 48,
            justifyContent: isOpen ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isOpen ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            sx={{ opacity: isOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    ))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={isOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderNavigationItems()}</List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ opacity: isOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}
