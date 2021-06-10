// import { useEffect } from 'react'

// import { callbackHandler } from 'libs/helpers'
import { Hero } from 'components/Hero'
import { Features } from 'components/Features'
import { CounterUrls } from 'components/CounterUrls'
import { MetaHead } from 'components/MetaHead/MetaHead'

import { Layout } from 'components/Layout/Layout'

function Homepage() {
  // useEffect(() => {
  //   // Triggering only on client side
  //   // the callback is using hashbang (#)
  //   // hard to detect on the server side
  //   if (typeof window !== 'undefined') {
  //     callbackHandler()
  //   }
  // }, [])

  return (
    <Layout>
      <MetaHead />
      <Hero />
      <Features />
      <CounterUrls />
    </Layout>
  )
}

export default Homepage
