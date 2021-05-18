import { Box } from '@chakra-ui/react'

import { Container } from './Container'
import { Header } from './Header'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Box as="main" minH="90vh" width="100%">{children}</Box>
      <Footer />
    </Container>
  )
}
