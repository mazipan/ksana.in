import { useState } from 'react'
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
import { v4 as uuidv4 } from 'uuid'

import { supabase } from '../libs/supabase'
import { sanitizeSlug } from '../libs/helpers'

import { HOME } from '../constants/paths'
import { useAlertContext } from '../context/Alert'

export const UrlForm = ({ onSuccess = () => {} }) => {
  const currentUser = supabase.auth.currentUser
  const { showAlert } = useAlertContext()

  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [isCheckPass, setIsCheckPass] = useState(false)
  const [errorText, setErrorText] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChangeUrl = (e) => {
    const value = e.target.value
    setUrl(value)
  }

  const handleChangeSlug = (e) => {
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

  const handleSaveNew = async () => {
    setLoading(true)
    const isEmpty = checkIsEmpty()
    if (!isEmpty) {
      const { error: errorInsert } = await supabase.from('urls').insert([
        {
          real_url: url,
          slug: sanitizeSlug(slug),
          user_id: currentUser?.id || uuidv4()
        }
      ])

      if (!errorInsert) {
        showAlert({
          title: 'Sukses menyimpan tautan baru',
          message: 'Tautan telah disimpan dalam basis data kami, silahkan mulai bagikan'
        })

        setUrl('')
        setSlug('')
        setIsCheckPass(false)
        setErrorText('')
        onSuccess()
      } else {
        showAlert({
          title: 'Terjadi galat pada saat menyimpan',
          message: `Pesan: ${errorInsert.message}`
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
            placeholder={'Ketikkan tautan asli disini'}
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
              children={HOME.replace('https://', '').replace('http://', '')}
              fontSize="xs"
            />
            <Input
              isRequired
              isInvalid={Boolean(errorText)}
              size="lg"
              name="slug"
              placeholder={'Tulis slug tautan dambaanmu'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              border={0}
              value={slug}
              onChange={handleChangeSlug}
            />
          </InputGroup>
          <FormHelperText>Tautan akan otomatis ditambahkan pada {HOME}</FormHelperText>
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
            Save the url
          </Button>
        ) : (
          <Button
            isLoading={loading}
            loadingText="Processing"
            size="lg"
            px={6}
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
            Check availability
          </Button>
        )}
      </Stack>
    </Box>
  )
}
