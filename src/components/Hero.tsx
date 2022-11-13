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
  useColorModeValue,
  keyframes
} from '@chakra-ui/react'
import { HiPlay } from 'react-icons/hi'

import { login } from 'constants/paths'

const shadowBlur = keyframes`
  0% {
    box-shadow: 0px 0px 0px 0px rgb(252 172 104), 0px 0px 0px 0px rgb(252 172 104);
  }
  50% {
    box-shadow: 1px 1px 14px 11px rgb(252 172 104), 0px 0px 0px 0px rgb(252 172 104);
  }
  100% {
    box-shadow: 0px 0px 0px 0px rgb(252 172 104), 0px 0px 0px 0px rgb(252 172 104);
  }
`

const shadowBlurAnimation = `${shadowBlur} infinite 1s ease-in-out`

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
              transition="all .5s ease-in-out"
              _hover={{
                bg: 'orange.500',
                animation: shadowBlurAnimation
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
