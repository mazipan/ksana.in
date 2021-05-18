import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from '../components/LayoutAuth'
import { AuthForm } from '../components/AuthForm'

const Register = () => {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <AuthForm state="register" />
    </LayoutAuth>
  )
}

export default Register
