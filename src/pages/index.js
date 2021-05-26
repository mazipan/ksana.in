import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { Layout } from '../components/Layout'

import { callbackHandler } from '../libs/helpers'

const Homepage = () => {
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
