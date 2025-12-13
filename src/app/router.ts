import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import SignInPage from '../pages/auth/signin_page'
import Dashboard from '../features/dashboard/dashboard'
import AgentView from '../pages/agent'
import {
  ProtectedCustomerView,
  ProtectedImportCustomersPage,
  ProtectedBusinessView,
  ProtectedUsersViewPage,
  ProtectedVehicleView,
  ProtectedVehicleLogView,
} from './router-wrappers'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SignInPage,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
    children: [
      { index: true, Component: Home },
      {
        path: 'customer',
        Component: ProtectedCustomerView,
      },
      {
        path: 'customer/import',
        Component: ProtectedImportCustomersPage,
      },
      { path: 'agent', Component: AgentView },
      {
        path: 'business',
        Component: ProtectedBusinessView,
      },
      {
        path: 'users',
        Component: ProtectedUsersViewPage,
      },
      {
        path: 'vehicles',
        Component: ProtectedVehicleView,
      },
      {
        path: 'vehicle-logs',
        Component: ProtectedVehicleLogView,
      },
    ],
  },
])
