import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSetNewPassword } from 'components/AuthSetNewPassword'

function SetNewPasswordPage() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <AuthSetNewPassword />
    </LayoutAuth>
  )
}

export default SetNewPasswordPage
