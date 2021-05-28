import { Box } from '@chakra-ui/react'

import { supabase } from 'libs/supabase'
import { Layout } from 'components/Layout/Layout'
import { ErrorDefault } from 'components/Error/ErrorDefault'

function SlugPage() {
  return (
    <Layout height="100vh">
      <Box width="100%">
        <ErrorDefault title="Tautan tidak tersedia" />
      </Box>
    </Layout>
  )
}

export async function getServerSideProps({ params }: any) {
  const slug = params.slug
  const { data } = await supabase.from('urls').select('real_url,slug,hit').eq('slug', slug).single()

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
