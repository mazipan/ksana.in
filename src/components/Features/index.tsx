import { Container, SimpleGrid, Icon, Heading, Stack } from '@chakra-ui/react'
import { FcLink, FcBullish, FcTreeStructure } from 'react-icons/fc'
import { Item as Feature } from './Item'

export function Features() {
  return (
    <Container maxW={'5xl'} mx="auto" as="section" mt="16">
      <Stack p={4} spacing="16">
        <Heading textAlign="center" as="h3">
          Fitur Kunci Ksana.in
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcLink} w={10} h={10} />}
            title={'Mempercantik Tautan'}
            text={'Tidak perlu lagi mengingat tautan yang panjang, pesan tautan dambaanmu sekarang'}
          />
          <Feature
            icon={<Icon as={FcTreeStructure} w={10} h={10} />}
            title={'Bagikan Tautan'}
            text={
              'Sangat mudah membagikan tautan ke berbagai sosial media dan pesan instan, langsung dari halaman dashboard'
            }
          />
          <Feature
            icon={<Icon as={FcBullish} w={10} h={10} />}
            title={'Pantau Statistik'}
            text={'Pantau jumlah pengguna yang mengunjungi tautanmu dengan mudah'}
          />
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
