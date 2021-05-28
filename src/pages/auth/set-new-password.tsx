import { useState, useEffect } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Image,
  useColorModeValue
} from '@chakra-ui/react'

import { LS_FP_TOKEN } from 'constants/common'
import { forgetPasword, login } from 'constants/paths'
import { useAlertContext } from 'context/Alert'
import { supabase } from 'libs/supabase'
import { LayoutAuth } from 'components/LayoutAuth'
import { HiUser } from 'components/HiUser'

const SetNewPasswordPage = () => {
  const currentUser: any = supabase.auth.currentUser
  const { showAlert } = useAlertContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string>('')
  const [errorForm, setErrorForm] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (window && window.localStorage) {
      const at: any = window.localStorage.getItem(LS_FP_TOKEN)
      setAccessToken(at)
    }
  }, [])

  const handleChangeEmail = (e: any) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleChangePassword = (e: any) => {
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

  const handleSetNewPassword: any = async () => {
    if (accessToken) {
      const { error } = await supabase.auth.api.updateUser(accessToken, {
        password: password
      })

      if (!error) {
        showAlert({
          title: 'Setel ulang password',
          message: 'Password telah berhasil disetel ulang',
          onCancel: () => {
            window.localStorage.removeItem(LS_FP_TOKEN)
            window.location.assign(login)
          }
        })
      }
    } else {
      showAlert({
        title: 'Access Token tidak ditemukan',
        message:
          'Maaf kami membutuhkan access token untuk bisa menyetel ulang kata sandi, silahkan lakukan reset password ulang.',
        onCancel: () => {
          window.location.assign(forgetPasword)
        }
      })
    }
  }

  const handleSubmit: any = async () => {
    setLoading(true)

    const isEmpty = checkIsEmpty()

    if (!isEmpty) {
      await handleSetNewPassword()
    }

    setLoading(false)
  }

  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      {currentUser ? (
        <HiUser />
      ) : (
        <Stack spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Setel ulang password</Heading>
          </Stack>
          {accessToken ? (
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
                    autoComplete={'new-password'}
                  />
                </FormControl>

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
                  Setel ulang password
                </Button>
              </Stack>
            </Box>
          ) : (
            <Stack as="section" spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Maaf, access token tidak ditemukan</Heading>
                <Image w="100%" src={'/ill_error_by_manypixels.svg'}></Image>
                <Button
                  px={6}
                  size="lg"
                  color={'white'}
                  bg="orange.400"
                  _hover={{
                    bg: 'orange.500'
                  }}
                  as={'a'}
                  href={forgetPasword}
                >
                  Minta ulang access token
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </LayoutAuth>
  )
}

export default SetNewPasswordPage
