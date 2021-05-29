import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSignIn } from 'components/AuthSignIn'

function Login() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <AuthSignIn />
    </LayoutAuth>
  )
}

export default Login
