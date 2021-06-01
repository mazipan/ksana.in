import { useEffect } from 'react'
import { Box } from '@chakra-ui/react'

import { callbackHandler } from 'libs/helpers'

import { Layout } from 'components/Layout/Layout'

import { ErrorDefault } from 'components/Error/ErrorDefault'
import { MetaHead, NO_INDEXED } from 'components/MetaHead/MetaHead'

function Callback() {
  useEffect(() => {
    // Triggering only on client side
    // the callback is using hashbang (#)
    // hard to detect on the server side
    if (typeof window !== 'undefined') {
      callbackHandler()
    }
  }, [])

  return (
    <Layout height="100vh">
      <MetaHead robots={NO_INDEXED} />
      <Box width="100%">
        <ErrorDefault title="Callback url tidak tersedia" />
      </Box>
    </Layout>
  )
}

export default Callback
