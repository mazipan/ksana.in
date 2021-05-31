import { PrivateRoute } from 'components/Route/PrivateRoute'

import { DashboardWrapper } from './Wrapper'

export function Dashboard() {
  return <PrivateRoute component={DashboardWrapper} />
}
