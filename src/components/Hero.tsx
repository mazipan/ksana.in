import {
  Container,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  Box,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import { HiPlay } from 'react-icons/hi'

import { login } from 'constants/paths'
import { BRAND_TAGLINE_LONG } from 'constants/texts'

export function Hero() {
  return (
    <Box w={'full'}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Container maxW={'6xl'} as="section" mt="32">
          <VStack spacing={{ base: 8, md: 10 }} px={{ base: 8, md: 10 }}>
            <Heading
              as="h2"
              textAlign="center"
              fontWeight={700}
              fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
              lineHeight={'110%'}
            >
              Pemendek tautan yang{' '}
              <Text color="orange.400" as="span">
                mudah
              </Text>{' '}
              dan{' '}
              <Text color="orange.400" as="span">
                gratis
              </Text>
            </Heading>

            <Text
              as="span"
              textAlign="center"
              color={useColorModeValue('gray.500', 'gray.300')}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
              lineHeight={'110%'}
            >
              {BRAND_TAGLINE_LONG}
            </Text>

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
              leftIcon={<HiPlay />}
            >
              Coba sekarang
            </Button>
          </VStack>
        </Container>

        <Container as="section" mt={{ base: 0, md: 10 }}>
          <Image w="100%" src={'/ill_by_manypixels.svg'}></Image>
        </Container>
      </SimpleGrid>
    </Box>
  )
}
