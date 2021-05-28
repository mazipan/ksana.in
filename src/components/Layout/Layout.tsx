import { Box } from '@chakra-ui/react'

import { MetaHead } from '../MetaHead'
import { Container } from '../Container'
import { Header } from '../Header/Header'
import { Footer } from '../Footer'

export function Layout({ children }: any) {
  return (
    <Container>
      <MetaHead />
      <Header />
      <Box as="main" minH="90vh" width="100%">{children}</Box>
      <Footer />
    </Container>
  )
}
