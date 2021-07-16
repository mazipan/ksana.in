import { Hero } from 'components/Hero'
import { Features } from 'components/Features'
import { CounterUrls } from 'components/CounterUrls'
import { MetaHead } from 'components/MetaHead/MetaHead'

import { Layout } from 'components/Layout/Layout'

function Homepage() {
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

export { getServerSideProps } from '../Chakra'
