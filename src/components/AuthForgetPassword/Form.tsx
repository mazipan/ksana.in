import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'

import { useAlertContext } from 'context/Alert'
import { supabase } from 'libs/supabase'
import { sendEvent } from 'libs/splitbee'

export function Form() {
  const router = useRouter()
  const { showAlert, hideAlert } = useAlertContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [errorForm, setErrorForm] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleChangeEmail = (e: any) => {
    const value = e.target.value
    setEmail(value)
  }

  const checkIsEmpty = () => {
    if (email === '') {
      setErrorForm('Email tidak boleh dikosongkan.')
      return true
    }

    setErrorForm('')
    return false
  }

  const handleResetPassword = async () => {
    sendEvent('Reset password')
    const { error } = await supabase.auth.api.resetPasswordForEmail(email)

    if (!error) {
      showAlert({
        title: 'Lupa password',
        message: 'Tautan untuk melakukan setel ulang kata sandi telah dikirim ke email kamu.',
        onClose: () => {
          hideAlert()
          router.push('/')
        }
      })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    const isEmpty = checkIsEmpty()

    if (!isEmpty) {
      await handleResetPassword()
    }

    setLoading(false)
  }

  return (
    <Stack spacing={8} mx={'auto'} mt="20" maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Lupa password</Heading>
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
            Minta reset password
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
