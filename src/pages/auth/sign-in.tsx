import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/LayoutAuth'
import { AuthForm } from 'components/AuthForm'

function Login() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <AuthForm state="login" />
    </LayoutAuth>
  )
}

export default Login
