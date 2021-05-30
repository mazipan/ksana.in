import { useState } from 'react'
import { mutate } from 'swr'
import {
  FormControl,
  Text,
  FormHelperText,
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  useColorModeValue
} from '@chakra-ui/react'

import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

import { HOME, apiUrlsGet } from 'constants/paths'
import { useAlertContext } from 'context/Alert'

export function UrlForm({ user, onSuccess = () => {} }: any) {
  const { showAlert, hideAlert } = useAlertContext()

  const [url, setUrl] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [isCheckPass, setIsCheckPass] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<boolean | string>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeUrl: any = (e: any) => {
    const value = e.target.value
    setUrl(value)
  }

  const handleChangeSlug: any = (e: any) => {
    const value = e.target.value
    setSlug(value)
  }

  const checkIsEmpty: any = () => {
    if (url === '' || slug === '') {
      setErrorText('URL dan slug tidak bisa dikosongkan')
      return true
    }

    setErrorText('')
    return false
  }

  const handleCheckAvailability: any = async () => {
    setLoading(true)
    const isEmpty = checkIsEmpty()
    if (!isEmpty) {
      setErrorText('')

      const { error: errorRealSlug } = await supabase
        .from('urls')
        .select('real_url,slug')
        .eq('slug', sanitizeSlug(slug))
        .single()

      if (errorRealSlug) {
        setIsCheckPass(true)
        setErrorText('')
      } else {
        setErrorText(`Slug ${slug} telah digunakan`)
      }
    }
    setLoading(false)
  }

  const handleSaveNew: any = async () => {
    setLoading(true)
    const isEmpty = checkIsEmpty()
    if (!isEmpty) {
      const { error: errorInsert } = await supabase.from('urls').insert([
        {
          real_url: url,
          slug: sanitizeSlug(slug),
          user_id: user?.id
        }
      ])

      if (!errorInsert) {
        showAlert({
          title: 'Sukses menyimpan tautan baru',
          message: 'Tautan telah disimpan dalam basis data kami, silahkan mulai bagikan',
          onClose: () => {
            hideAlert()
            mutate(apiUrlsGet(user?.id))
            setUrl('')
            setSlug('')
            setIsCheckPass(false)
            setErrorText('')
            onSuccess()
          }
        })
      } else {
        showAlert({
          title: 'Terjadi galat pada saat menyimpan',
          message: `Pesan: ${errorInsert.message}`,
          onClose: () => {
            hideAlert()
            setErrorText(errorInsert.message)
          }
        })
      }
    }
    setLoading(false)
  }

  return (
    <Box width={{ base: '100%' }}>
      <Stack spacing={2} direction={{ base: 'column' }}>
        <FormControl id="url" isRequired>
          <Input
            isRequired
            isInvalid={Boolean(errorText)}
            size="lg"
            name="url"
            placeholder={'Tautan yang akan dipercantik'}
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            border={0}
            value={url}
            onChange={handleChangeUrl}
          />
        </FormControl>

        <FormControl id="slug" isRequired>
          <InputGroup size="lg">
            <InputLeftAddon
              bg={'orange.400'}
              color={'white'}
              fontWeight="bold"
              px={1}
              children={HOME?.replace('https://', '').replace('http://', '')}
              fontSize="xs"
            />
            <Input
              isRequired
              isInvalid={Boolean(errorText)}
              size="lg"
              name="slug"
              placeholder={'Slug cantik dambaanmu'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              border={0}
              value={slug}
              onChange={handleChangeSlug}
            />
          </InputGroup>
          <FormHelperText>Hanya diperbolehkan menggunakan huruf, angka, karakter titik dan strip saja.</FormHelperText>
        </FormControl>

        {errorText && (
          <Text color="red.300" fontSize="xs">
            Error: {errorText}
          </Text>
        )}

        {isCheckPass ? (
          <Button
            isLoading={loading}
            loadingText="Processing"
            size="lg"
            px={6}
            mt="4"
            color={'white'}
            bg={'green.400'}
            _hover={{
              bg: 'green.500'
            }}
            _focus={{
              bg: 'green.500'
            }}
            onClick={handleSaveNew}
          >
            Simpan sekarang
          </Button>
        ) : (
          <Button
            isLoading={loading}
            loadingText="Processing"
            size="lg"
            px={6}
            my="4"
            color={'white'}
            bg={'orange.400'}
            _hover={{
              bg: 'orange.500'
            }}
            _focus={{
              bg: 'orange.500'
            }}
            onClick={handleCheckAvailability}
          >
            Cek dulu ya
          </Button>
        )}
      </Stack>
    </Box>
  )
}
