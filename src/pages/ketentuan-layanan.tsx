import Image from 'next/image'
import {
  VStack,
  Heading,
  Text,
  Link,
  Container,
  List,
  ListItem,
  ListIcon,
  useColorModeValue
} from '@chakra-ui/react'
import { HiCheck } from 'react-icons/hi'

import { BRAND } from 'constants/texts'

import { MetaHead } from 'components/MetaHead/MetaHead'
import { Layout } from 'components/Layout/Layout'

function Terms() {
  const textColor = useColorModeValue('gray.500', 'gray.300')

  return (
    <Layout>
      <MetaHead
        title="Ketentuan Layanan | Ksana.in"
        description="Persyaratan layanan yang merupakan perjanjian mengikat dan mengatur penggunaan Anda atas Ksana.in"
      />
      <VStack spacing={4} textAlign="center" as="section" mt="32">
        <VStack spacing={4} textAlign="center">
          <Heading
            as="h1"
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            color="orange.400"
          >
            Ketentuan Layanan
          </Heading>
          <Image width={200} height={122} src={'/images/orange/ksana.svg'} alt="Ksana.in" />
        </VStack>

        <Container maxW={'4xl'} mx="auto" as="section">
          <VStack spacing={8} textAlign="left">
            <Text color={textColor}>
              Terima kasih telah menggunakan{' '}
              <Link href="/" color="orange.400">
                {BRAND}
              </Link>{' '}
              . Persyaratan layanan ini merupakan perjanjian yang mengikat dan mengatur penggunaan
              Anda atas{' '}
              <Link href="/" color="orange.400">
                {BRAND}
              </Link>{' '}
              dan akses ke situs web{' '}
              <Link href="/" color="orange.400">
                {BRAND}
              </Link>{' '}
              . Dengan menggunakan salah satu layanan{' '}
              <Link href="/" color="orange.400">
                {BRAND}
              </Link>
              , atau mengakses salah satu situs web kami, Anda setuju untuk terikat oleh persyaratan
              layanan berikut.
            </Text>

            <Text color={textColor}>
              Jika Anda memasuki perjanjian ini atas nama perusahaan atau badan hukum lainnya, Anda
              menyatakan bahwa Anda memiliki kewenangan untuk mengikat entitas tersebut,
              afiliasinya, semua pengguna yang mengakses layanan kami melalui akun Anda. Dalam kasus
              tersebut, istilah "Anda" atau "milik Anda" merujuk pada perusahaan atau entitas hukum,
              dan pengguna yang terkait dengannya. Jika Anda tidak memiliki kewenangan, jangan
              setuju dengan syarat dan ketentuan ini atas nama perusahaan atau badan hukum lainnya.
            </Text>

            <Text color={textColor}>
              Jika Anda tidak setuju dengan persyaratan layanan ini,{' '}
              <Text as="span" fontWeight="bold">
                jangan terima persyaratannya, dan jangan gunakan layanannya.
              </Text>
            </Text>

            <Text color={textColor}>
              Kami berhak memperbarui dan mengubah persyaratan layanan dari waktu ke waktu tanpa
              pemberitahuan sebelumnya. Setiap fitur baru yang menambah atau meningkatkan layanan
              saat ini, termasuk rilis alat dan sumber daya baru, harus tunduk pada persyaratan
              layanan. Penggunaan berkelanjutan atas layanan setelah perubahan tersebut merupakan
              persetujuan Anda untuk perubahan tersebut. Anda dapat meninjau versi terbaru dari
              persyaratan layanan kapan saja di sini.
            </Text>

            <Text color={textColor}>
              Pelanggaran salah satu persyaratan di bawah ini akan mengakibatkan penghentian akun
              Anda. Meskipun kami melarang perilaku dan konten tertentu di layanan, Anda memahami
              dan setuju bahwa kami tidak dapat bertanggung jawab atas konten yang diposting di
              layanan dan Anda mungkin akan melihat materi tersebut. Anda setuju untuk menggunakan
              layanan dengan risiko Anda sendiri.
            </Text>

            <Heading
              as="h3"
              fontWeight={700}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
              lineHeight={'110%'}
              mt="8"
              mb="2"
            >
              Ketentuan Privasi
            </Heading>
            <Text color={textColor}>
              Kami menghormati privasi Anda. Pernyataan lengkap tentang kebijakan privasi kami dapat
              ditemukan di{' '}
              <Link href="/kebijakan-privasi" color="orange.400">
                halaman kebijakan privasi
              </Link>
              . Kebijakan privasi kami secara tegas dimasukkan sebagai referensi ke dalam perjanjian
              ini.
            </Text>

            <Heading
              as="h3"
              fontWeight={700}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
              lineHeight={'110%'}
              mt="8"
              mb="2"
            >
              Persyaratan Akun
            </Heading>

            <Text color={textColor}>Untuk menggunakan layanan ini, Anda harus:</Text>

            <List spacing={3}>
              <ListItem color={textColor}>
                <ListIcon as={HiCheck} color="green.500" />
                Berusia 11 tahun atau lebih dan jadilah manusia. Akun yang didaftarkan oleh "bot"
                atau metode otomatis lainnya tidak diizinkan. berikan nama lengkap resmi Anda,
                alamat email yang valid, dan informasi lainnya yang diminta untuk menyelesaikan
                proses pendaftaran.
              </ListItem>
              <ListItem color={textColor}>
                <ListIcon as={HiCheck} color="green.500" />
                Anda bertanggung jawab untuk menjaga keamanan akun dan kata sandi Anda.
              </ListItem>
              <ListItem color={textColor}>
                <ListIcon as={HiCheck} color="green.500" />
                Kami tidak dapat dan tidak akan bertanggung jawab atas kehilangan atau kerusakan
                akibat kegagalan Anda untuk mematuhi kewajiban keamanan ini. Login Anda hanya dapat
                digunakan oleh satu orang - satu login yang digunakan bersama oleh banyak orang
                tidak diizinkan. Anda dapat membuat login terpisah untuk sebanyak mungkin orang
                sesuai rencana Anda.
              </ListItem>
              <ListItem color={textColor}>
                <ListIcon as={HiCheck} color="green.500" />
                Anda bertanggung jawab atas semua konten yang diposting dan aktivitas yang terjadi
                di bawah akun Anda (bahkan ketika konten diposting oleh orang lain yang memiliki
                akun di bawah akun Anda).
              </ListItem>
              <ListItem color={textColor}>
                <ListIcon as={HiCheck} color="green.500" />
                Anda tidak boleh menggunakan layanan untuk tujuan ilegal atau tidak sah. Anda tidak
                boleh, dalam penggunaan layanan, melanggar hukum apa pun di yurisdiksi Anda
                (termasuk namun tidak terbatas pada undang-undang hak cipta atau merek dagang)
              </ListItem>
            </List>

            <Heading
              as="h3"
              fontWeight={700}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
              lineHeight={'110%'}
              mt="8"
              mb="2"
            >
              Hak Cipta dan Kepemilikan Konten
            </Heading>

            <List spacing={3}>
              <ListItem color={textColor}>
                <ListIcon as={HiCheck} color="green.500" />
                Kami tidak mengklaim hak kekayaan intelektual atas materi yang Anda berikan ke
                layanan. Profil dan materi yang Anda unggah tetap menjadi milik Anda. Namun, jika
                Anda mengatur konten Anda untuk dilihat secara publik, Anda setuju untuk mengizinkan
                orang lain untuk melihat konten Anda.
              </ListItem>
              <ListItem color={textColor}>
                <ListIcon as={HiCheck} color="green.500" />
                Kami tidak menyaring konten, tetapi kami memiliki hak (tetapi bukan kewajiban) atas
                kebijakan kami sendiri untuk menolak atau menghapus konten apa pun yang tersedia
                melalui layanan.
              </ListItem>
            </List>

            <Text color={textColor} mt="8">
              Pertanyaan tentang ketentuan layanan kami dapat ditujukan ke mazipanneh@gmail.com
            </Text>
            <Text color={textColor} mt="8">
              Terakhir diperbarui pada{' '}
              <Text color="orange.400" as="span">
                29 Mei 2021
              </Text>
            </Text>
          </VStack>
        </Container>
      </VStack>
    </Layout>
  )
}

export default Terms

export { getServerSideProps } from '../Chakra'
