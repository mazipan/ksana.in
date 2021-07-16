import Image from 'next/image'
import {
  VStack,
  Heading,
  Text,
  Box,
  Link,
  Image as ImageChakra,
  Container,
  SimpleGrid,
  useColorModeValue,
  HStack
} from '@chakra-ui/react'

import { BRAND } from 'constants/texts'
import { github } from 'constants/paths'

import { MetaHead } from 'components/MetaHead/MetaHead'
import { Layout } from 'components/Layout/Layout'

export interface ITools {
  title: string
  url: string
}

const tools = [
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
    title: 'SWR',
    url: 'https://swr.vercel.app/'
  },
  {
    title: 'React-Icons',
    url: 'https://react-icons.github.io/react-icons/'
  },
  {
    title: 'Oge',
    url: 'https://oge.vercel.app/'
  },
  {
    title: 'ManyPixels.co',
    url: 'https://www.manypixels.co/gallery'
  }
]

function About() {
  const colorText = useColorModeValue('gray.500', 'gray.300')
  const bgBox = useColorModeValue('white', 'gray.800')

  return (
    <Layout>
      <MetaHead
        title="Tentang Kami | Ksana.in"
        description="Ksana.in adalah layanan pemendek tautan / URL yang gratis dan mudah untuk digunakan, buatan asli anak Indonesia"
      />
      <VStack spacing={2} textAlign="center" as="section" mt="32">
        <Heading
          as="h1"
          fontWeight={700}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          color="orange.400"
        >
          Tentang Kami
        </Heading>
        <Image width={200} height={122} src={'/images/orange/ksana.svg'} alt="Ksana.in" />
      </VStack>
      <Container maxW={'4xl'} mx="auto" as="section" mt="8">
        <VStack spacing={4}>
          <Text color={colorText}>
            {BRAND} adalah layanan pemendek tautan / URL yang gratis dan mudah untuk digunakan.
            Layanan ini diinisiasi oleh Irfan Maulana dalam rangka mempelajari layanan baru dari
            Supabase.io, membuat sesuatu projek nyata untuk bisa mengimplementasikan langsung apa
            yang memang sedang ingin dipelajari.
          </Text>
          <Text color={colorText}>
            {BRAND} tidak bisa dibuat tanpa beberapa layanan dan alat bantu berikut:
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2}>
            {tools.map((t: ITools) => (
              <Box
                key={t.title}
                bg={bgBox}
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
          <Text color={colorText}>
            {BRAND} dibuat secara terbuka agar bisa dijadikan bahan pembelajaran bersama, semua kode
            dan assets tersedia gratis untuk semua pembelajar
          </Text>
          <HStack
            w="80%"
            bg={bgBox}
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
            <ImageChakra
              src={'https://img.shields.io/github/stars/mazipan/ksana.in?style=social'}
            />
          </HStack>
          <Text color={colorText}>
            Untuk mendukung saya dan {BRAND} terus berkreasi membuat kode terbuka lainnya, kalian
            bisa mengirimkan dana untuk membeli kopi melalui{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              color="orange.400"
              fontWeight="bold"
              href="https://trakteer.id/mazipan/tip?utm_source=ksana"
            >
              Trakteer.id
            </Link>
          </Text>
          <Text color={colorText} mt="16">
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

export { getServerSideProps } from '../Chakra'
