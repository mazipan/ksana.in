import {
  VStack,
  Heading,
  Text,
  Image,
  Box,
  Link,
  Container,
  SimpleGrid,
  useColorModeValue,
  HStack
} from '@chakra-ui/react'

import { BRAND } from 'constants/texts'
import { github } from 'constants/paths'
import { Layout } from 'components/Layout/Layout'

const tools: any = [
  {
    title: 'Next.js',
    url: 'https://nextjs.org/'
  },
  {
    title: 'Chakra-UI',
    url: 'https://chakra-ui.com/docs/getting-started'
  },
  {
    title: 'Supabase',
    url: 'https://supabase.io/'
  },
  {
    title: 'Oge',
    url: 'https://oge.vercel.app/'
  }
]

function About() {
  return (
    <Layout height="100vh">
      <VStack spacing={2} textAlign="center" as="section" mt="32">
        <Heading
          as="h1"
          fontWeight={700}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Tentang Kami
        </Heading>
        <Image w="200px" src={'/orange/ksana.svg'}></Image>
      </VStack>
      <Container maxW={'4xl'} mx="auto" as="section" mt="8">
        <VStack spacing={4}>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            {BRAND} adalah proyek yang dibuat oleh Irfan Maulana dalam rangka mempelajari layanan
            baru dari Supabase.io, membuat sesuatu untuk bisa mengimplementasikan langsung apa yang
            ingin dipelajari.
          </Text>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            {BRAND} tidak bisa dibuat tanpa beberapa layanan dan alat bantu berikut:
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2}>
            {tools.map((t: any) => (
              <Box
                key={t.title}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={6}
              >
                <Link
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="orange.400"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                >
                  {t.title}
                </Link>
              </Box>
            ))}
          </SimpleGrid>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            {BRAND} dibuat secara terbuka agar bisa dijadikan bahan pembelajaran bersama, semua kode
            dan assets tersedia gratis untuk semua pembelajar
          </Text>
          <HStack
            w="80%"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
            p={6}
            spacing={4}
            justifyContent="space-between"
            wrap="wrap"
          >
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              color="orange.400"
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="bold"
            >
              ksana.in/gh
            </Link>
            <Image src={'https://img.shields.io/github/stars/mazipan/ksana.in?style=social'} />
          </HStack>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Untuk mendukung saya dan {BRAND} terus berkreasi membuat kode terbuka lainnya, kalian
            bisa mengirimkan dana untuk membeli kopi melalui{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              color="orange.400"
              fontWeight="bold"
              href="https://trakteer.id/mazipan?utm_source=ksana.id"
            >
              Trakteer.id
            </Link>
          </Text>
          <Text color={useColorModeValue('gray.500', 'gray.300')} mt="16">
            Dari pembuat {BRAND}
            {', '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              color="orange.400"
              fontWeight="bold"
              href="https://mazipan.space"
            >
              Irfan Maulana
            </Link>
          </Text>
        </VStack>
      </Container>
    </Layout>
  )
}

export default About
