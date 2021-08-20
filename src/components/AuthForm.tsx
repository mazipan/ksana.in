import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { Session } from '@supabase/gotrue-js'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { SiGoogle, SiGithub, SiTwitter } from 'react-icons/si'

import {
  setSessionToServer,
  loginWithGoogle,
  loginWithGithub,
  loginWithTwitter,
  login,
  register
} from 'libs/supabase'
import { useAlertContext } from 'context/Alert'
import { forgetPasword, dashboard } from 'constants/paths'
import {
  EVENT_SIGN_IN,
  isEnableGithubLogin,
  isEnableGoogleLogin,
  isEnableTwitterLogin
} from 'constants/common'

export interface IAuthFormProps {
  state: string
}

export interface IProcessResponse {
  session: Session | null
  error: Error | null
  stateType: string
}

export function AuthForm({ state }: IAuthFormProps) {
  const router = useRouter()
  const { showAlert, hideAlert } = useAlertContext()

  const bgBox = useColorModeValue('white', 'gray.700')
  const [internalState, setInternalState] = useState<any>(state)
  const [isLogin, setIsLogin] = useState<any>(state === 'login')

  const [loading, setLoading] = useState<boolean>(false)
  const [errorForm, setErrorForm] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const toggleState = () => {
    if (internalState === 'login') {
      setInternalState('register')
      setIsLogin(false)
    } else {
      setInternalState('login')
      setIsLogin(true)
    }
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleLoginGoogle = async () => {
    setLoading(true)
    await loginWithGoogle()
    setLoading(false)
  }

  const handleLoginGithub = async () => {
    setLoading(true)
    await loginWithGithub()
    setLoading(false)
  }

  const handleLoginTwitter = async () => {
    setLoading(true)
    await loginWithTwitter()
    setLoading(false)
  }

  const processResponse = async ({ session, error, stateType = 'login' }: IProcessResponse) => {
    if (error) {
      setErrorForm(error.message)
      return false
    }

    if (session && !error) {
      if (stateType === 'login') {
        // only set for the login flow
        await setSessionToServer(EVENT_SIGN_IN, session)
      }

      showAlert({
        title: `${stateType === 'login' ? 'Login' : 'Register'} success`,
        message: `${
          stateType === 'login'
            ? 'Selamat datang kembali!'
            : 'Terima kasih telah mendaftar. Silahkan melakukan verifikasi dengan mengklik tautan yang kami kirimkan melalui email.'
        }`,
        onClose: () => {
          hideAlert()

          if (stateType === 'login') {
            setTimeout(() => {
              // trigger hard redirect to dashboard page
              // TODO: mutate SWR to reload the user data
              window.location.assign(dashboard)
            }, 500)
          } else {
            router.push('/')
          }
        }
      })
    }
  }

  const handleLogin = async () => {
    const { session, error } = await login({
      email: email,
      password: password
    })

    processResponse({ session, error, stateType: 'login' })
  }

  const handleRegister = async () => {
    const { session, error } = await register({
      email: email,
      password: password
    })

    processResponse({ session, error, stateType: 'register' })
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === '13') {
      handleSubmit()
    }
  }

  return (
    <Stack spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading
          fontWeight={700}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          color="orange.400"
        >
          {isLogin ? 'Masuk ke akunmu' : 'Daftarkan akun baru'}
        </Heading>
      </Stack>
      <Box rounded={'lg'} bg={bgBox} boxShadow={'lg'} p={8}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              isInvalid={Boolean(errorForm)}
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
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
              color="white"
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

          <VStack
            direction="row"
            align={'center'}
            justify={'center'}
            borderTop="1px"
            borderColor="gray.200"
            py="4"
          >
            {isEnableGoogleLogin && (
              <Button
                isLoading={loading}
                loadingText="Memproses"
                variant={'outline'}
                w="full"
                onClick={handleLoginGoogle}
                leftIcon={<SiGoogle />}
              >
                {isLogin ? 'Masuk dengan Google' : 'Daftar dengan Google'}
              </Button>
            )}

            {isEnableTwitterLogin && (
              <Button
                isLoading={loading}
                loadingText="Memproses"
                variant={'outline'}
                w="full"
                onClick={handleLoginTwitter}
                leftIcon={<SiTwitter />}
              >
                {isLogin ? 'Masuk dengan Twitter' : 'Daftar dengan Twitter'}
              </Button>
            )}

            {isEnableGithubLogin && (
              <Button
                isLoading={loading}
                loadingText="Memproses"
                variant={'outline'}
                w="full"
                onClick={handleLoginGithub}
                leftIcon={<SiGithub />}
              >
                {isLogin ? 'Masuk dengan Github' : 'Daftar dengan Github'}
              </Button>
            )}
          </VStack>
        </Stack>
      </Box>
    </Stack>
  )
}

AuthForm.defaultProps = {
  state: 'login'
}
