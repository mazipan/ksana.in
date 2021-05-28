import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { SignUp } from 'components/SignUp'

function Register() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <SignUp />
    </LayoutAuth>
  )
}

export default Register
