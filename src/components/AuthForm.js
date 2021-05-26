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

import { supabase, setServerSideAuth } from '../libs/supabase'

import { useAlertContext } from '../context/Alert'

import { forgetPasword } from '../constants/paths'
import { EVENT_SIGN_IN } from '../constants/common'

import { HiUser } from './HiUser'

export const AuthForm = ({ state = 'login' }) => {
  const currentUser = supabase.auth.currentUser
  const { showAlert } = useAlertContext()

  // eslint-disable-next-line no-unused-vars
  const [internalState, setInternalState] = useState(state)
  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useState(state === 'login')

  const [loading, setLoading] = useState(false)
  const [errorForm, setErrorForm] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, setLoginUser] = useState(currentUser)

  const toggleState = () => {
    if (internalState === 'login') {
      setInternalState('register')
      setIsLogin(false)
    } else {
      setInternalState('login')
      setIsLogin(true)
    }
  }

  const handleChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  const checkIsEmpty = () => {
    if (email === '' || password === '') {
      setErrorForm('Email dan password tidak boleh dikosongkan.')
      return true
    }

    setErrorForm('')
    return false
  }

  const handleSubmit = async () => {
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

  const processResponse = ({ user, session, error }) => {
    if (error) {
      console.error(error.message)
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

  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password
    })

    processResponse({ user, session, error })
  }

  const handleRegister = async () => {
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
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
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
                      <Button
                        variant="link"
                        as={Link}
                        color={'orange.400'}
                        href={forgetPasword}
                      >
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
                    <Button
                      variant="link"
                      as={Link}
                      color={'orange.400'}
                      onClick={toggleState}
                    >
                      Daftar sekarang
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" align={'center'} justify={'center'}>
                    <Text>Sudah punya akun? </Text>
                    <Button
                      variant="link"
                      as={Link}
                      color={'orange.400'}
                      onClick={toggleState}
                    >
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
