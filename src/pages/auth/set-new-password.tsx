import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSetNewPassword } from 'components/AuthSetNewPassword'
import { MetaHead, NO_INDEXED } from 'components/MetaHead/MetaHead'

function SetNewPasswordPage() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <MetaHead robots={NO_INDEXED} title="Setel ulang password di Ksana.in" />
      <AuthSetNewPassword />
    </LayoutAuth>
  )
}

export default SetNewPasswordPage
