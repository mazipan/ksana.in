import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSetNewPassword } from 'components/AuthSetNewPassword'
import { MetaHead, NO_INDEXED } from 'components/MetaHead/MetaHead'

function SetNewPasswordPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <LayoutAuth minH={'100vh'} bg={bgColor}>
      <MetaHead robots={NO_INDEXED} title="Setel ulang password di Ksana.in" />
      <AuthSetNewPassword />
    </LayoutAuth>
  )
}

export default SetNewPasswordPage

export { getServerSideProps } from '../../Chakra'
