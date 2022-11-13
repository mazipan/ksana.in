import { ChangeEvent, useState } from 'react'
import { mutate } from 'swr'
import {
  FormControl,
  FormHelperText,
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  FormLabel,
  Switch,
  Tooltip
} from '@chakra-ui/react'

import { HiQuestionMarkCircle, HiOutlineExclamation } from 'react-icons/hi'
import { checkSlug, saveUrl } from 'libs/supabase'
import { sanitizeSlug, validateURL } from 'libs/helpers'

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
  const [isDynamic, setIsDynamic] = useState<boolean>(false)
  const [errorUrl, setErrorUrl] = useState<boolean | string>(false)
  const [errorSlug, setErrorSlug] = useState<boolean | string>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUrl(value)
    setErrorUrl('')
  }

  const handleChangeSlug = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSlug(value)
    setErrorSlug('')
  }

  const handleChangeIsDynamic = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    setIsDynamic(value)
  }

  const resetErrorMessage = () => {
    setErrorUrl('')
    setErrorSlug('')
  }

  const checkIsEmpty = () => {
    if (url === '') {
      setErrorUrl('URL dan slug tidak bisa dikosongkan')
      return true
    }

    if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
      setErrorUrl('Pastikan URL dimulai dengan http:// atau https://')
      return true
    }

    if (slug === '') {
      setErrorSlug('URL dan slug tidak bisa dikosongkan')
      return true
    }

    if (slug.length < 3) {
      setErrorSlug('Slug minimal 3 karakter')
      return true
    }

    return false
  }

  const checkParamRequired = () => {
    const params = url.match(/{param}/g) || []

    if (isDynamic && !params.length) {
      setErrorUrl('Tautan dinamis membutuhkan teks {param} di dalamnya')
      return false
    }

    if (isDynamic && params.length > 1) {
      setErrorUrl('Teks {param} cukup satu saja')
      return false
    }

    return true
  }

  const handleCheckAvailability = async () => {
    setLoading(true)
    resetErrorMessage()
    const isEmpty = checkIsEmpty()
    const hasParam = checkParamRequired()
    const { isValid, error } = validateURL(url)
    if (!isValid && error) {
      setErrorUrl(error)
    } else {
      if (!isEmpty && hasParam) {
        const response = await checkSlug({ slug: sanitizeSlug(slug) })
        if (response.error) {
          setIsCheckPass(true)
          resetErrorMessage()
        } else {
          setErrorSlug(`Slug ${slug} telah digunakan, coba slug lain`)
        }
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
        is_dynamic: isDynamic,
        userId: user?.id
      })

      if (!errorInsert) {
        showAlert({
          title: 'Sukses menyimpan tautan baru',
          message: 'Tautan telah disimpan dalam basis data kami, silahkan mulai bagikan',
          onClose: () => {
            hideAlert()
            setUrl('')
            setSlug('')
            setIsCheckPass(false)
            resetErrorMessage()
            onSuccess()
            mutate(apiUrlsGet())
          }
        })
      } else {
        showAlert({
          title: 'Terjadi galat pada saat berusaha menyimpan data',
          message: `Pesan: ${errorInsert.message}`,
          onClose: () => {
            hideAlert()
            setIsCheckPass(false)
            resetErrorMessage()
          }
        })
      }
    }
    setLoading(false)
  }

  return (
    <Box width={{ base: '100%' }}>
      <Stack spacing={4} direction={{ base: 'column' }}>
        <FormControl id="url" isRequired>
          <Input
            isRequired
            isInvalid={Boolean(errorUrl)}
            size="md"
            name="url"
            placeholder={'Tautan asli yang akan dipercantik'}
            variant="filled"
            borderColor="orange.400"
            value={url}
            onChange={handleChangeUrl}
          />
          {errorUrl && (
            <FormHelperText
              color="red.500"
              fontSize=".8rem"
              display="flex"
              alignItems="center"
              gap="1"
            >
              <HiOutlineExclamation /> Error: {errorUrl}
            </FormHelperText>
          )}
          <FormHelperText fontSize=".8rem">
            Membutuhkan tautan dalam bentuk utuh, termasuk awalan https://
          </FormHelperText>
          {isDynamic && (
            <FormHelperText fontSize=".8rem">
              Tip: sisipkan teks <code>{'{param}'}</code> pada tautan
            </FormHelperText>
          )}
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="is-dynamic" mb="0" display="flex">
            Tautan dinamis{' '}
            <Tooltip
              label="Kamu bisa membuat tautan dinamis macam: https://mazipan.space/{param}"
              placement="bottom"
            >
              <i>
                <HiQuestionMarkCircle />
              </i>
            </Tooltip>
          </FormLabel>
          <Switch id="is-dynamic" onChange={handleChangeIsDynamic} />
        </FormControl>

        <FormControl id="slug" isRequired>
          <InputGroup size="md">
            <InputLeftAddon
              color={'orange.400'}
              borderColor={'orange.400'}
              borderWidth="2px"
              px={2}
              children={HOME?.replace('https://', '').replace('http://', '')}
              fontSize="xs"
            />
            <Input
              isRequired
              isInvalid={Boolean(errorSlug)}
              size="md"
              name="slug"
              borderColor="orange.400"
              placeholder={'Slug baru pilihanmu'}
              variant="filled"
              value={slug}
              onChange={handleChangeSlug}
            />
          </InputGroup>
          {errorSlug && (
            <FormHelperText
              color="red.500"
              fontSize=".8rem"
              display="flex"
              alignItems="center"
              gap="1"
            >
              <HiOutlineExclamation /> Error: {errorSlug}
            </FormHelperText>
          )}
          <FormHelperText fontSize=".8rem">
            Hanya diperbolehkan menggunakan huruf, angka, karakter titik dan strip saja
          </FormHelperText>
        </FormControl>

        {isCheckPass ? (
          <Button
            isLoading={loading}
            loadingText="Processing"
            size="md"
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
            size="md"
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
            Cek ketersediaan slug
          </Button>
        )}
      </Stack>
    </Box>
  )
}
