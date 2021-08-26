import { ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

import { Container } from '../Container'
import { Header } from '../Header/Header'
import { Footer } from '../Footer'

export interface ILayoutProps extends BoxProps {
  children: ReactNode
}

export function Layout({ children, ...props }: ILayoutProps) {
  return (
    <Container>
      <Header />
      <Box as="main" minH="90vh" width="100%" {...props}>
        {children}
      </Box>
      <Footer withBacklink={true} />
    </Container>
  )
}
