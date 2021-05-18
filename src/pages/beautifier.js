import {
  Box,
  Stack,
  Input,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'

import { LayoutAuth } from '../components/LayoutAuth'

const Beautifier = () => {
  return (
    <LayoutAuth minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
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
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Beautify your link now!</Heading>
        </Stack>

        <Box width={{ base: '100%', md: '4xl' }}>
          <Stack spacing={2} direction={{ base: 'column', md: 'row' }}>
            <Input
              placeholder={'Type your ugly url here'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              border={0}
              _focus={{
                bg: 'whiteAlpha.300'
              }}
            />
            <Button
              px={6}
              color={'white'}
              bg={'blue.400'}
              _hover={{
                bg: 'blue.500'
              }}
              _focus={{
                bg: 'blue.500'
              }}
            >
              Check Availability
            </Button>
          </Stack>
        </Box>
      </Stack>
    </LayoutAuth>
  )
}

export default Beautifier
