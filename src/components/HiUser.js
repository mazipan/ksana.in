import { Stack, Button, Heading } from '@chakra-ui/react'

import { supabase } from '../libs/supabase'

export const HiUser = () => {
  const currentUser = supabase.auth.currentUser

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      // hard reload to refresh data
      setTimeout(() => {
        window.location.assign('/')
      }, 500)
    }
  }

  return (
    <Stack as="section" spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Selamat datang, {currentUser.email}</Heading>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Button
          px={6}
          color={'white'}
          bg="orange.400"
          _hover={{
            bg: 'orange.500'
          }}
          as={'a'}
          href={'/dashboard'}
        >
          Kunjungi halaman dashboard
        </Button>
        <Button
          px={6}
          color={'white'}
          bg="red.400"
          _hover={{
            bg: 'red.500'
          }}
          onClick={handleLogout}
        >
          Keluar
        </Button>
      </Stack>
    </Stack>
  )
}
