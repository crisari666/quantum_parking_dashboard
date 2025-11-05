
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import { CustomerView } from '../pages/customer'
import { ImportCustomersPage } from '../pages/customer/import-customers'
import SignInPage from '../pages/auth/signin_page'
import Dashboard from '../features/dashboard/dashboard'
import AgentView from '../pages/agent'
import { BusinessView } from '../pages/business'
import { UsersViewPage } from '../pages/users'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SignInPage,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
    children: [
      {index: true,Component: Home} ,
      {path: 'customer',Component: CustomerView},
      {path: 'customer/import',Component: ImportCustomersPage},
      {path: 'agent',Component: AgentView},
      {path: 'business',Component: BusinessView},
      {path: 'users',Component: UsersViewPage},
    ],
  },
])

