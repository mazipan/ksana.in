import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSignIn } from 'components/AuthSignIn'
import { MetaHead } from 'components/MetaHead/MetaHead'

function Login() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <MetaHead title="Masuk ke akun Ksana.in" />
      <AuthSignIn />
    </LayoutAuth>
  )
}

export default Login
