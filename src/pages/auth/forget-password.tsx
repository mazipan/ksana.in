import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthForgetPassword } from 'components/AuthForgetPassword'
import { MetaHead } from 'components/MetaHead/MetaHead'

function ForgetPasswordPage() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <MetaHead title="Lupa Password | Ksana.in" />
      <AuthForgetPassword />
    </LayoutAuth>
  )
}

export default ForgetPasswordPage
