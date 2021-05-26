import { Stack, Button, Image, Heading } from '@chakra-ui/react'

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
    <Stack
      as="section"
      spacing={8}
      mx={'auto'}
      mt="20"
      maxW={'lg'}
      py={12}
      px={6}
    >
      <Stack align={'center'} spacing={2} >
        <Heading fontSize={'4xl'}>Selamat datang, {currentUser.email}</Heading>
        <Image w="100%" src={'/ill_error_by_manypixels.svg'}></Image>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Button
          px={6}
          size="lg"
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
          size="lg"
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
