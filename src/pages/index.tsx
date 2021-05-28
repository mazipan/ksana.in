import { useEffect } from 'react'

import { callbackHandler } from 'libs/helpers'
import { Hero } from 'components/Hero'
import { Features } from 'components/Features'
import { Layout } from 'components/Layout'

function Homepage() {
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
      <Hero />
      <Features />
    </Layout>
  )
}

export default Homepage
