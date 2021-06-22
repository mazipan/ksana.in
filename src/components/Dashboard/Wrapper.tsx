import { useState } from 'react'
import { Stack, Box, Flex, Heading, Text, IconButton } from '@chakra-ui/react'
import { HiPlus, HiMinus } from 'react-icons/hi'

import { UrlForm } from './UrlForm'
import { UrlList } from './UrlList'
import { IUser } from 'interfaces/IUser'

export interface IDashboardWrapperProps {
  user: IUser
}

export function DashboardWrapper({ user }: IDashboardWrapperProps) {
  const [showAdd, setShowAdd] = useState<boolean>(false)

  const handleShowAdd = () => {
    setShowAdd(!showAdd)
  }

  const handleSuccessAdd = () => {
    setShowAdd(false)
    window.location.reload()
  }

  return (
    <Box width={{ base: '100%' }}>
      {user && user.id ? (
        <Stack spacing={8} width="100%">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h3" size="2xl" color="orange.400" display="flex">
              <Text>Tautan Saya</Text>
            </Heading>
            <IconButton
              onClick={handleShowAdd}
              aria-label="Tambah baru"
              fontSize="20px"
              borderRadius="md"
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
          {showAdd ? <UrlForm user={user} onSuccess={handleSuccessAdd} /> : null}
          <UrlList user={user} isFormVisible={showAdd} onShowForm={handleShowAdd} />
        </Stack>
      ) : null}
    </Box>
  )
}
