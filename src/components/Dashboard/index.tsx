import { useState } from 'react'
import { Stack, Box, Flex, Heading, Text, IconButton } from '@chakra-ui/react'
import { HiLink, HiPlus, HiMinus } from 'react-icons/hi'

import { useAuthContext } from 'context/Auth'

import { ErrorNotLogin } from 'components/Error/ErrorNotLogin'
import { LoadingSpinner } from 'components/LoadingSpinner'

import { UrlForm } from './UrlForm'
import { UrlList } from './UrlList'

export function Dashboard() {
  const { user, isLoading, isLogin } = useAuthContext()
  const [showAdd, setShowAdd] = useState<boolean>(false)

  const handleShowAdd: any = () => {
    setShowAdd(!showAdd)
  }

  const handleSuccessAdd: any = () => {
    setShowAdd(false)
    window.location.reload()
  }

  if (isLoading) {
    return (
      <Box width={{ base: '100%' }}>
        <Flex justifyContent="center" alignItems="center">
          <LoadingSpinner />
        </Flex>
      </Box>
    )
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
