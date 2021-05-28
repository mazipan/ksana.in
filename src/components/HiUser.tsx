import { Stack, Button, Image, Heading, Text } from '@chakra-ui/react'
import { HiLogout, HiCollection } from 'react-icons/hi'

import { supabase, setServerSideAuth, logout } from 'libs/supabase'
import { EVENT_SIGN_OUT, LS_AUTH_TOKEN } from 'constants/common'

export function HiUser({ user }: any) {
  const handleLogout: any = async () => {
    const currentSession = supabase.auth.currentSession

    const { error } = await logout()
    setServerSideAuth(EVENT_SIGN_OUT, currentSession)

    if (!error) {
      // hard reload to refresh data
      setTimeout(() => {
        window.localStorage.removeItem(LS_AUTH_TOKEN)
        window.location.assign('/')
      }, 500)
    }
  }

  return (
    <Stack as="section" spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
      <Stack align={'center'} spacing={8}>
        <Heading
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          textAlign="center"
        >
          Selamat datang,{' '}
          <Text color="orange.400" fontSize={{ base: 'lg', md: 'xl' }}>
            {user ? user.email.split('@')[0] : ''}
          </Text>
        </Heading>
        <Image w="100%" src={'/ill_teamwork_by_manypixels.svg'}></Image>
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
          leftIcon={<HiCollection />}
        >
          Lihat dashboard
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
          leftIcon={<HiLogout />}
        >
          Keluar
        </Button>
      </Stack>
    </Stack>
  )
}
