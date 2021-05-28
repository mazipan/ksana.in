import { VStack, Heading, Image } from '@chakra-ui/react'

import { Layout } from 'components/Layout/Layout'

function Terms() {
  return (
    <Layout height="100vh">
      <VStack spacing={2} textAlign="center" as="section" mt="32">
        <Heading
          as="h1"
          fontWeight={700}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Ketentuan Layanan
        </Heading>
        <Image w="200px" src={'/orange/ksana.svg'}></Image>
      </VStack>
    </Layout>
  )
}

export default Terms
