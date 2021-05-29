import { dashboard } from 'constants/paths'
import { PublicRoute } from 'components/Route/PublicRoute'
import { AuthForm } from 'components/AuthForm'

export function AuthSignUp() {
  return (
    <PublicRoute redirectPath={dashboard}>
      <AuthForm state="register" />
    </PublicRoute>
  )
}

export default AuthSignUp
