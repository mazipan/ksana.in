import { Box, Stack, Button, Image, Heading } from '@chakra-ui/react'

import { Layout } from '../components/Layout'

import { supabase } from '../libs/supabase'

function SlugPage () {
  return (
    <Layout height="100vh">
      <Box width="100%">
        <Stack
          as="section"
          spacing={8}
          mx={'auto'}
          mt="20"
          maxW={'lg'}
          py={12}
          px={6}
        >
          <Stack align={'center'} spacing={4}>
            <Heading fontSize={'4xl'}>Tautan tidak tersedia</Heading>
            <Image w="100%" src={'/ill_error_by_manypixels.svg'}></Image>
            <Button
              px={6}
              size="lg"
              color={'white'}
              bg="orange.400"
              _hover={{
                bg: 'orange.500'
              }}
              as={'a'}
              href={'/'}
            >
              Ke beranda
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const slug = params.slug
  const { data } = await supabase
    .from('urls')
    .select('real_url,slug,hit')
    .eq('slug', slug)
    .single()

  if (data && data.real_url) {
    // update hit field for a simple stats
    await supabase
      .from('urls')
      .update({ hit: data.hit + 1 })
      .match({ slug: slug })

    return {
      redirect: {
        destination: data.real_url,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default SlugPage
