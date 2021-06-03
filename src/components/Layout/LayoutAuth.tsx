import { Box } from '@chakra-ui/react'

import { AuthProvider } from 'context/Auth'

import { Container } from '../Container'
import { Header } from '../Header/HeaderAuth'
import { Footer } from '../Footer'

export function LayoutAuth({ children }: any) {
  return (
    <AuthProvider>
      <Container>
        <Header />
        <Box as="main" minH="90vh" width="100%">
          {children}
        </Box>
        <Footer />
      </Container>
    </AuthProvider>
  )
}
