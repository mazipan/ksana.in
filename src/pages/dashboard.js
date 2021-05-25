import { useState } from 'react'
import { Stack, Box, Flex, Heading, Text, IconButton } from '@chakra-ui/react'

import { HiLink, HiPlus, HiMinus } from 'react-icons/hi'

import { UrlForm } from '../components/UrlForm'
import { UrlList } from '../components/UrlList'
import { LayoutAuth } from '../components/LayoutAuth'

const Dashboard = () => {
  const [showAdd, setShowAdd] = useState(false)

  const handleShowAdd = () => {
    setShowAdd(!showAdd)
  }

  return (
    <LayoutAuth height="100vh">
      <Stack
        spacing={8}
        mx={'auto'}
        mt="20"
        width={{ base: '100%', md: '4xl' }}
        py={12}
        px={6}
        as="section"
        align={'center'}
        justify={'center'}
      >
        <Box width={{ base: '100%' }}>
          <Stack mt={8} spacing={8} width="100%">
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
            {showAdd && <UrlForm />}
            <UrlList />
          </Stack>
        </Box>
      </Stack>
    </LayoutAuth>
  )
}

export default Dashboard
