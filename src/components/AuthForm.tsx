import { useState } from 'react'

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import { supabase, setServerSideAuth } from 'libs/supabase'
import { useAlertContext } from 'context/Alert'
import { forgetPasword } from 'constants/paths'
import { EVENT_SIGN_IN } from 'constants/common'
import { HiUser } from './HiUser'

export function AuthForm({ state = 'login' }: any) {
  const currentUser: any = supabase.auth.currentUser
  const { showAlert } = useAlertContext()

  const [internalState, setInternalState] = useState<any>(state)
  const [isLogin, setIsLogin] = useState<any>(state === 'login')

  const [loading, setLoading] = useState<boolean>(false)
  const [errorForm, setErrorForm] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginUser, setLoginUser] = useState<any>(currentUser)

  const toggleState: any = () => {
    if (internalState === 'login') {
      setInternalState('register')
      setIsLogin(false)
    } else {
      setInternalState('login')
      setIsLogin(true)
    }
  }

  const handleChangeEmail: any = (e: any) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleChangePassword: any = (e: any) => {
    const value = e.target.value
    setPassword(value)
  }

  const checkIsEmpty: any = () => {
    if (email === '' || password === '') {
      setErrorForm('Email dan password tidak boleh dikosongkan.')
      return true
    }

    setErrorForm('')
    return false
  }

  const handleSubmit: any = async () => {
    setLoading(true)

    const isEmpty = checkIsEmpty()

    if (!isEmpty) {
      if (isLogin) {
        await handleLogin()
      } else {
        await handleRegister()
      }
    }

    setLoading(false)
  }

  const processResponse: any = ({ user, session, error }: any) => {
    if (error) {
      setErrorForm(error.message)
      return false
    }

    if (session && !error) {
      setLoginUser({
        id: user.id,
        email: user.email
      })

      setServerSideAuth(EVENT_SIGN_IN, session)

      showAlert({
        title: `${isLogin ? 'Login' : 'Register'} success`,
        message: `${
          isLogin
            ? 'Selamat datang kembali!'
            : 'Terima kasih telah mendaftar. Silahkan melakukan verifikasi dengan mengklik tautan yang kami kirimkan melalui email.'
        }`
      })
    }
  }

  const handleLogin: any = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password
    })

    processResponse({ user, session, error })
  }

  const handleRegister: any = async () => {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    processResponse({ user, session, error })
  }

  return (
    <>
      {loginUser ? (
        <HiUser />
      ) : (
        <>
          <Stack spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>
                {isLogin ? 'Masuk ke akunmu' : 'Daftarkan akun baru'}
              </Heading>
            </Stack>
            <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    isInvalid={Boolean(errorForm)}
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    autoComplete="username"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    isInvalid={Boolean(errorForm)}
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                </FormControl>

                {errorForm && (
                  <Text color="red.300" fontSize="xs">
                    Galat: {errorForm}
                  </Text>
                )}

                <Stack spacing={10}>
                  {isLogin ? (
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Button variant="link" as={Link} color={'orange.400'} href={forgetPasword}>
                        Lupa password?
                      </Button>
                    </Stack>
                  ) : null}

                  <Button
                    isLoading={loading}
                    loadingText="Memproses"
                    w="full"
                    bg="orange.400"
                    _hover={{
                      bg: 'orange.500'
                    }}
                    onClick={handleSubmit}
                  >
                    {isLogin ? 'Masuk' : 'Daftar Sekarang'}
                  </Button>
                </Stack>

                {isLogin ? (
                  <Stack direction="row" align={'center'} justify={'center'}>
                    <Text>Belum punya akun? </Text>
                    <Button variant="link" as={Link} color={'orange.400'} onClick={toggleState}>
                      Daftar sekarang
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" align={'center'} justify={'center'}>
                    <Text>Sudah punya akun? </Text>
                    <Button variant="link" as={Link} color={'orange.400'} onClick={toggleState}>
                      Masuk
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </>
  )
}
