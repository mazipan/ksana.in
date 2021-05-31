import { dashboard } from 'constants/paths'
import { PublicRoute } from 'components/Route/PublicRoute'

import { Form } from './Form'

export function AuthSetNewPassword() {
  return (
    <PublicRoute redirectPath={dashboard}>
      <Form />
    </PublicRoute>
  )
}

export default AuthSetNewPassword
