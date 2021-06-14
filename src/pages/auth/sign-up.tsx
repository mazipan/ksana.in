import { useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSignUp } from 'components/AuthSignUp'
import { MetaHead } from 'components/MetaHead/MetaHead'

function Register() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <MetaHead
        title="Daftar Akun | Ksana.in"
        description="Tertarik mencoba layanan pemendek tautan / URL yang gratis dan sangat mudah digunakan? Mari daftarkan akun baru di Ksana.in"
      />
      <AuthSignUp />
    </LayoutAuth>
  )
}

export default Register
