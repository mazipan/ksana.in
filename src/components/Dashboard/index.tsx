import { DashboardWrapper } from './Wrapper'
import { PrivateRoute } from 'components/Route/PrivateRoute'

export function Dashboard() {
  return <PrivateRoute component={DashboardWrapper} />
}
