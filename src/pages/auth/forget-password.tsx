import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthForgetPassword } from 'components/AuthForgetPassword'

function ForgetPasswordPage() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <AuthForgetPassword />
    </LayoutAuth>
  )
}

export default ForgetPasswordPage
