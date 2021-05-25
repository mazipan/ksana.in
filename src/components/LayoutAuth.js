import { Auth } from '@supabase/ui'
import { Box } from '@chakra-ui/react'

import { MetaHead } from './MetaHead'
import { Container } from './Container'
import { Header } from './Header'
import { Footer } from './Footer'

import { supabase } from '../libs/supabase'

export const LayoutAuth = ({ children }) => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <MetaHead />
        <Header />
        <Box as="main" minH="90vh" width="100%">
          {children}
        </Box>
        <Footer />
      </Container>
    </Auth.UserContextProvider>
  )
}
