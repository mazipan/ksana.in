import { Stack, Button, useColorModeValue } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { AuthSignIn } from 'components/AuthSignIn'
import { MetaHead } from 'components/MetaHead/MetaHead'

import { loginWithGoogle } from 'libs/supabase'

function Login() {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <MetaHead title="[Test] - Masuk ke akun Ksana.in" />
      <AuthSignIn />

      <Stack mx={'auto'} maxW={'lg'} px={6}>
        <Stack align={'center'}>
          <Button
            w="full"
            bg="blue.400"
            _hover={{
              bg: 'blue.500'
            }}
            color="white"
            onClick={loginWithGoogle}
          >
            Login with Google
          </Button>
        </Stack>
      </Stack>
    </LayoutAuth>
  )
}

export default Login
