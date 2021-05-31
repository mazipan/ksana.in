import { dashboard } from 'constants/paths'
import { PublicRoute } from 'components/Route/PublicRoute'

import { Form } from './Form'

export function AuthForgetPassword() {
  return (
    <PublicRoute redirectPath={dashboard}>
      <Form />
    </PublicRoute>
  )
}

export default AuthForgetPassword
