import { ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

import { AuthProvider } from 'context/Auth'

import { Container } from 'components/Container'
import { Header } from 'components/Header/HeaderAuth'
import { Footer } from 'components/Footer'

export interface ILayoutAuthProps extends BoxProps {
  children: ReactNode
}

export function LayoutAuth({ children, ...props }: ILayoutAuthProps) {
  return (
    <AuthProvider>
      <Container>
        <Header />
        <Box as="main" minH="90vh" width="100%" {...props}>
          {children}
        </Box>
        <Footer withBacklink={false} />
      </Container>
    </AuthProvider>
  )
}
