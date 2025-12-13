import { CustomerView } from '../pages/customer'
import { ImportCustomersPage } from '../pages/customer/import-customers'
import { BusinessView } from '../pages/business'
import { UsersViewPage } from '../pages/users'
import { VehicleView } from '../pages/vehicle'
import { VehicleLogView } from '../pages/vehicle-log'
import RoleProtectedRoute from '../components/RoleProtectedRoute'

// Wrapper components for protected routes
export const ProtectedCustomerView = () => (
  <RoleProtectedRoute allowedRoles={['admin']}>
    <CustomerView />
  </RoleProtectedRoute>
)

export const ProtectedImportCustomersPage = () => (
  <RoleProtectedRoute allowedRoles={['admin']}>
    <ImportCustomersPage />
  </RoleProtectedRoute>
)

export const ProtectedBusinessView = () => (
  <RoleProtectedRoute allowedRoles={['admin', 'user']}>
    <BusinessView />
  </RoleProtectedRoute>
)

export const ProtectedUsersViewPage = () => (
  <RoleProtectedRoute allowedRoles={['admin', 'user']}>
    <UsersViewPage />
  </RoleProtectedRoute>
)

export const ProtectedVehicleView = () => (
  <RoleProtectedRoute allowedRoles={['admin', 'user']}>
    <VehicleView />
  </RoleProtectedRoute>
)

export const ProtectedVehicleLogView = () => (
  <RoleProtectedRoute allowedRoles={['admin', 'user']}>
    <VehicleLogView />
  </RoleProtectedRoute>
)
