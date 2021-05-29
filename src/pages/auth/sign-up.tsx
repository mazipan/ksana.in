import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSignUp } from 'components/AuthSignUp'

function Register() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <AuthSignUp />
    </LayoutAuth>
  )
}

export default Register
