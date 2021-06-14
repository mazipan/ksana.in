import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSignIn } from 'components/AuthSignIn'
import { MetaHead } from 'components/MetaHead/MetaHead'

function Login() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <MetaHead
        title="Masuk/Login | Ksana.in"
        description="Sudah punya Akun di Ksana.in? Yuk login dan gunakan layanan dari Ksana.in untuk membantu memepercantik tautan Anda sekarang juga."
      />
      <AuthSignIn />
    </LayoutAuth>
  )
}

export default Login
