import AppDrawer from './app_drawer'
import SessionStateManager from './session-state-manager'

export default function Dashboard() {
  return (
    <>
      <SessionStateManager />
      <AppDrawer />
    </>
  )
}