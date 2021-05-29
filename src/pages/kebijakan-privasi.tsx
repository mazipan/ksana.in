import { VStack, Heading, Text, Link, Container, Image, useColorModeValue } from '@chakra-ui/react'

import { BRAND } from 'constants/texts'
import { Layout } from 'components/Layout/Layout'

function Privacy() {
  return (
    <Layout height="100vh">
      <VStack spacing={4} textAlign="center" as="section" mt="32">
        <VStack spacing={4} textAlign="center">
          <Heading
            as="h1"
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Kebijakan Privasi
          </Heading>
          <Image w="200px" src={'/orange/ksana.svg'}></Image>
        </VStack>

        <Container maxW={'4xl'} mx="auto" as="section">
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Kami di{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>{' '}
            menyadari bahwa Anda mengharapkan privasi dan keamanan dalam hal informasi yang
            mengidentifikasi Anda secara pribadi dan memungkinkan Anda untuk dihubungi secara
            individu ("Informasi Pribadi"). Kami mengadopsi kebijakan privasi online berikut karena
            kami memahami kebutuhan untuk melindungi informasi yang mungkin Anda berikan kepada kami
            di situs web kami.
          </Text>
          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Mengapa {BRAND} meminta informasi tentang Anda
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>{' '}
            mengumpulkan dan menyimpan Informasi Pribadi tentang Anda hanya ketika Anda telah
            berkomunikasi dengan kami melalui email (kami akan mengumpulkan alamat email Anda),
            ketika Anda mendaftar untuk menggunakan layanan{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>{' '}
            (kami akan menanyakan nama dan alamat email Anda) , dan saat Anda mendaftar untuk
            layanan berbayar (kami akan meminta informasi umum seperti nama, alamat email, alamat
            penagihan, dan informasi kartu kredit Anda). Kami menggunakan informasi tersebut untuk
            bertransaksi bisnis dengan Anda dan memberikan layanan yang diminta dari waktu ke waktu,
            serta peningkatan layanan, kontak, dan penelitian.
          </Text>
          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Bagaimana {BRAND} melindungi informasi Anda
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Informasi yang kami terima dari Anda dilindungi dari akses tidak sah setelah kami
            menerimanya. Kami membatasi akses ke informasi Anda hanya untuk karyawan yang memiliki
            alasan bisnis untuk mengaksesnya. Saat mengumpulkan informasi keuangan dari Anda, kami
            menggunakan perangkat lunak lapisan soket aman (SSL). Terlepas dari upaya kami yang
            terus menerus dan berkembang untuk melindungi informasi pribadi Anda, kami tidak dapat
            menjamin keamanan Informasi Pribadi Anda. Anda mengakui dan setuju bahwa kami tidak
            memberikan jaminan seperti itu.
          </Text>
          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Penyimpanan data
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Kami tidak menggunakan vendor pihak ketiga dan mitra hosting untuk menyediakan perangkat
            keras, perangkat lunak, jaringan, penyimpanan, dan teknologi terkait yang diperlukan
            untuk menjalankan{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>
            . Kami memiliki kode, database, dan semua hak atas aplikasi{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>
            , Anda memegang semua hak atas data Anda.
          </Text>
          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Pengunaan Cookies
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Kami menggunakan cookie. Cookies adalah bagian kecil dari informasi yang disimpan oleh
            browser Anda di hard drive komputer Anda. Kami menggunakan cookie sehingga situs web
            kami dapat mengingat Anda dan menyediakan konten yang paling mungkin Anda minta. Kami
            juga menggunakan cookie untuk mengumpulkan informasi statistik tentang situs web kami,
            seperti waktu yang dihabiskan pengguna di suatu situs dan halaman yang paling sering
            mereka kunjungi. Statistik tersebut tidak mengandung Informasi Pribadi. Kami juga akan
            menggunakan cookie untuk tujuan periklanan dan pemasaran ulang.
          </Text>
          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Tautan ke situs web lain
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Situs web kami mungkin berisi tautan ke dan dari situs web lain. Beberapa tautan mungkin
            dalam bentuk iklan tampilan. Kami tidak dapat menjamin bahwa situs web selain situs web
            kami akan menghormati dan melindungi Informasi Pribadi Anda seperti yang kami lakukan.
            Untuk perlindungan Anda sendiri, Anda harus mengunjungi dan membaca pernyataan /
            kebijakan privasi situs web lain saat Anda mengunjunginya. Kami tidak bertanggung jawab
            atas konten situs web selain situs web kami.
          </Text>
          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Persetujuan Anda
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Ketika Anda memberikan Informasi Pribadi kepada kami, Anda menyetujui pengumpulan dan
            penggunaan informasi ini oleh{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>
            .
          </Text>
          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Penyingkapan
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Kami tidak akan menjual atau mendistribusikan Informasi Pribadi Anda kecuali untuk
            menyediakan produk atau layanan yang Anda minta, jika kami memiliki izin, atau
            diperlukan untuk berbagi informasi untuk menyelidiki, mencegah, atau mengambil tindakan
            terkait aktivitas ilegal, dugaan penipuan, situasi yang melibatkan potensi ancaman
            terhadap keamanan fisik siapa pun, pelanggaran Persyaratan Layanan, atau sebagaimana
            diwajibkan oleh hukum.
          </Text>

          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Transfer Bisnis
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Jika{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>
            , atau secara substansial semua asetnya diakuisisi, atau dalam hal yang tidak mungkin
            terjadi ketika kami keluar dari bisnis atau dinyatakan pailit, Informasi Pribadi akan
            menjadi salah satu aset yang dialihkan atau diakuisisi oleh pihak ketiga. Anda mengakui
            bahwa transfer tersebut dapat terjadi, dan bahwa setiap pihak yang mengakuisisi{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>
            dapat terus menggunakan Informasi Pribadi sebagaimana diatur dalam kebijakan ini.
          </Text>

          <Heading
            as="h3"
            fontWeight={700}
            fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            lineHeight={'110%'}
            mt="8"
            mb="2"
          >
            Perubahan
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')}>
            Kami mungkin memperbarui kebijakan ini secara berkala. Kami akan memberi tahu Anda
            tentang perubahan signifikan dalam cara kami memperlakukan informasi pribadi dengan
            mengirimkan pemberitahuan ke alamat email utama yang ditentukan di akun pemegang akun
            utama{' '}
            <Link href="/" color="orange.400">
              {BRAND}
            </Link>{' '}
            Anda atau dengan menempatkan pemberitahuan yang mencolok di situs kami.
          </Text>
          <Text color={useColorModeValue('gray.500', 'gray.300')} mt="8">
            Pertanyaan tentang kebijakan privasi kami dapat ditujukan ke mazipanneh@gmail.com
          </Text>
          <Text color={useColorModeValue('gray.500', 'gray.300')} mt="8">
            Terakhir diperbarui pada{' '}
            <Text color="orange.400" as="span">
              29 Mei 2021
            </Text>
          </Text>
        </Container>
      </VStack>
    </Layout>
  )
}

export default Privacy
