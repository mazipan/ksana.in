import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { Layout } from '../components/Layout'
import { setNewPassword } from '../constants/paths'

const Homepage = () => {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const urlObj = new URL(`https://example.com?${hash.slice(1)}`)
      const type = urlObj.searchParams.get('type') || ''
      if (type === 'recovery') {
        const accessToken = urlObj.searchParams.get('access_token')
        window.localStorage.setItem('ksana.in.fp-at', accessToken)
        window.location.assign(setNewPassword)
      }
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
