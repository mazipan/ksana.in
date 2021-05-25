import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button
} from '@chakra-ui/react'

import { login } from '../constants/paths'
import { BRAND_TAGLINE, BRAND_TAGLINE_LONG } from '../constants/texts'

export const Hero = () => {
  return (
    <Container maxW={'5xl'} as="section" mt="20">
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          as="h2"
          fontWeight={700}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          {BRAND_TAGLINE}
        </Heading>

        <Text
          color={'gray.500'}
          maxW={'3xl'}
          fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
        >
          {BRAND_TAGLINE_LONG}
        </Text>
        <Stack spacing={2} direction={'row'}>
          <Button
            size="lg"
            rounded="full"
            px={6}
            color={'white'}
            bg="orange.400"
            _hover={{
              bg: 'orange.500'
            }}
            as={'a'}
            href={login}
          >
            Coba sekarang
          </Button>
        </Stack>
        <Flex w={'full'}></Flex>
      </Stack>
    </Container>
  )
}
