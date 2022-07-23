import { Box } from '@chakra-ui/react'

import { supabase } from 'libs/supabase'
import { Layout } from 'components/Layout/Layout'

import { ErrorDefault } from 'components/Error/ErrorDefault'
import { MetaHead, NO_INDEXED } from 'components/MetaHead/MetaHead'

function SlugPage() {
  return (
    <Layout>
      <MetaHead robots={NO_INDEXED} />
      <Box width="100%">
        <ErrorDefault title="Tautan tidak tersedia" />
      </Box>
    </Layout>
  )
}

export interface IGetServerSideProps {
  params: {
    all: [string, string?]
  }
}

export async function getServerSideProps({ params }: IGetServerSideProps) {
  const [slug, param] = params.all

  const { data } = await supabase
    .from('urls')
    .select('real_url,slug,hit,is_dynamic')
    .eq('slug', slug)
    .single()

  if (data && data.real_url) {
    // update hit field for a simple stats
    await supabase
      .from('urls')
      .update({ hit: data.hit + 1 })
      .match({ slug: slug })

    const destination = !!data.is_dynamic ? data.real_url.replace(/{param}/, param) : data.real_url

    return {
      notFound: !!data.is_dynamic && !param?.length,
      redirect: {
        destination,
        permanent: true
      }
    }
  }

  return {
    props: {},
    notFound: true
  }
}

export default SlugPage
