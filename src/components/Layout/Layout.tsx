import { Box } from '@chakra-ui/react'

import { Container } from '../Container'
import { Header } from '../Header/Header'
import { Footer } from '../Footer'

export function Layout({ children }: any) {
  return (
    <Container>
      <Header />
      <Box as="main" minH="90vh" width="100%">
        {children}
      </Box>
      <Footer />
    </Container>
  )
}
