import { Form } from './Form'
import { dashboard } from 'constants/paths'
import { PublicRoute } from 'components/Route/PublicRoute'

export function AuthForgetPassword() {
  return (
    <PublicRoute redirectPath={dashboard}>
      <Form />
    </PublicRoute>
  )
}

export default AuthForgetPassword
