import {
  Box,
  Container,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue
} from '@chakra-ui/react'

import {
  login,
  tentang,
  dashboard,
  ketentuanLayanan,
  kebijakanPrivasi,
  github,
  splitbeeAnalytics
} from 'constants/paths'
import { BRAND } from 'constants/texts'

export function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      as="footer"
      width="100%"
    >
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="5" y="0" fill="rgba(237, 137, 54, 0.18)" />
          <use xlinkHref="#gentle-wave" x="20" y="3" fill="rgba(237, 137, 54, 0.3)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(237, 137, 54, 0.4)" />
          <use xlinkHref="#gentle-wave" x="90" y="30" fill="rgba(237, 137, 54, 0.7)" />
        </g>
      </svg>

      <Box width="100%">
        <Container maxW={'5xl'}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} py={4}>
            <Stack align={'flex-start'}>
              <Text fontWeight="700" color="orange.400" fontSize={'lg'} mb={2}>
                Lebih banyak
              </Text>
              <Link href={tentang}>Tentang kami</Link>
              <Link href={login}>Masuk</Link>
              <Link href={dashboard}>Dashboard</Link>
            </Stack>

            <Stack align={'flex-start'}>
              <Text fontWeight="700" color="orange.400" fontSize={'lg'} mb={2}>
                Sumber daya
              </Text>

              <Link href={github} target="_blank" rel="noopener noreferrer">
                Github Repo
              </Link>
              <Link
                href="https://github.com/mazipan/ksana.in/issues/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                Laporkan Isu
              </Link>
              <Link href={splitbeeAnalytics} target="_blank" rel="noopener noreferrer">
                Statistik Ksana.in
              </Link>
            </Stack>

            <Stack align={'flex-start'}>
              <Text fontWeight="700" color="orange.400" fontSize={'lg'} mb={2}>
                Legal
              </Text>
              <Link href={kebijakanPrivasi}>Kebijakan Privasi</Link>
              <Link href={ketentuanLayanan}>Ketentuan Layanan</Link>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      <Box bg="orange.400" width="100%">
        <Container maxW={'5xl'}>
          <Flex
            as={Stack}
            py={4}
            alignItems="center"
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ md: 'space-between' }}
            align={{ md: 'center' }}
          >
            <Text>
              © 2021{' '}
              <Link href={'/'} textDecoration="underline">
                {BRAND}
              </Link>{' '}
              dibuat oleh{' '}
              <Link
                textDecoration="underline"
                href={'https://mazipan.space/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Irfan Maulana
              </Link>
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
