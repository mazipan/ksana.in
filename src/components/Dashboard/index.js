import { useState } from 'react'
import { Stack, Box, Flex, Heading, Text, IconButton } from '@chakra-ui/react'

import { HiLink, HiPlus, HiMinus } from 'react-icons/hi'

import { useAuthContext } from '../../context/Auth'

import { UrlForm } from '../UrlForm/index'
import { UrlList } from '../UrlList/index'
import { ErrorNotLogin } from '../ErrorNotLogin'

export const Dashboard = () => {
  const { user, isLogin } = useAuthContext()
  const [showAdd, setShowAdd] = useState(false)

  const handleShowAdd = () => {
    setShowAdd(!showAdd)
  }

  const handleSuccessAdd = () => {
    setShowAdd(false)
    window.location.reload()
  }

  return (
    <Box width={{ base: '100%' }}>
      <Stack spacing={8} width="100%">
        {isLogin && user.id ? (
          <>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as="h3" size="2xl" color="orange.400" display="flex">
                <HiLink /> <Text>Tautan Saya</Text>
              </Heading>
              <IconButton
                onClick={handleShowAdd}
                aria-label="Tambah baru"
                fontSize="20px"
                bg={'orange.400'}
                _hover={{
                  bg: 'orange.500'
                }}
                _focus={{
                  bg: 'orange.500'
                }}
                icon={showAdd ? <HiMinus color="white" /> : <HiPlus color="white" />}
              />
            </Flex>
            {showAdd && <UrlForm user={user} onSuccess={handleSuccessAdd} />}
            <UrlList user={user} isFormVisible={showAdd} onShowForm={handleShowAdd} />
          </>
        ) : (
          <ErrorNotLogin />
        )}
      </Stack>
    </Box>
  )
}
