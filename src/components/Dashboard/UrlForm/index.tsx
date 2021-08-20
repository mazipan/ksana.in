import { ChangeEvent, useState } from 'react'
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
  Button
} from '@chakra-ui/react'

import { checkSlug, saveUrl } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

import { HOME, apiUrlsGet } from 'constants/paths'
import { useAlertContext } from 'context/Alert'
import { IUser } from 'interfaces/IUser'

export interface IUrlFormProps {
  user: IUser
  onSuccess: () => void
}

export function UrlForm({ user, onSuccess }: IUrlFormProps) {
  const { showAlert, hideAlert } = useAlertContext()

  const [url, setUrl] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [isCheckPass, setIsCheckPass] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<boolean | string>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUrl(value)
  }

  const handleChangeSlug = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSlug(value)
  }

  const checkIsEmpty = () => {
    if (url === '' || slug === '') {
      setErrorText('URL dan slug tidak bisa dikosongkan')
      return true
    }

    setErrorText('')
    return false
  }

  const handleCheckAvailability = async () => {
    setLoading(true)
    const isEmpty = checkIsEmpty()
    if (!isEmpty) {
      setErrorText('')

      const response = await checkSlug({ slug: sanitizeSlug(slug) })
      if (response.error) {
        setIsCheckPass(true)
        setErrorText('')
      } else {
        setErrorText(`Slug ${slug} telah digunakan`)
      }
    }
    setLoading(false)
  }

  const handleSaveNew = async () => {
    setLoading(true)
    const isEmpty = checkIsEmpty()
    if (!isEmpty) {
      const { error: errorInsert } = await saveUrl({
        url: url,
        slug: sanitizeSlug(slug),
        userId: user?.id
      })

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
          title: 'Terjadi galat pada saat berusaha menyimpan data',
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
            variant="filled"
            value={url}
            onChange={handleChangeUrl}
          />
          <FormHelperText>
            Membutuhkan tautan dalam bentuk utuh, termasuk awalan https://
          </FormHelperText>
        </FormControl>

        <FormControl id="slug" isRequired>
          <InputGroup size="lg">
            <InputLeftAddon
              color={'orange.400'}
              fontWeight="bold"
              px={2}
              children={HOME?.replace('https://', '').replace('http://', '')}
              fontSize="xs"
            />
            <Input
              isRequired
              isInvalid={Boolean(errorText)}
              size="lg"
              name="slug"
              placeholder={'Slug cantik dambaanmu'}
              variant="filled"
              value={slug}
              onChange={handleChangeSlug}
            />
          </InputGroup>
          <FormHelperText>
            Hanya diperbolehkan menggunakan huruf, angka, karakter titik dan strip saja
          </FormHelperText>
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
