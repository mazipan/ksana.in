import Image from 'next/image'
import {
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Box,
  Flex,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import { HiPlay } from 'react-icons/hi'

import { login } from 'constants/paths'

export function Hero() {
  const textColor = useColorModeValue('gray.500', 'gray.300')

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
              color={textColor}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
              lineHeight={'110%'}
            >
              Percantik tautanmu, jadikan agar mudah diingat, bagikan ke orang lain dengan percaya
              diri
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

        <Flex as="section" mt={{ base: 0, md: 20 }} justifyContent="center">
          <Image
            width={400}
            height={400}
            src={'/images/illustrations/ill_by_manypixels.svg'}
            alt="Women with Internet"
            priority={true}
          />
        </Flex>
      </SimpleGrid>
    </Box>
  )
}
