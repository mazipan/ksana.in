import { dashboard } from 'constants/paths'
import { AuthForm } from 'components/AuthForm'
import { PublicRoute } from 'components/Route/PublicRoute'

export function AuthSignIn() {
  return (
    <PublicRoute redirectPath={dashboard}>
      <AuthForm state="login" />
    </PublicRoute>
  )
}

export default AuthSignIn
