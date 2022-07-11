import { GetServerSideProps } from 'next'
import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react'

import theme from './theme'

const manager = createLocalStorageManager('theme')

export function Chakra({ children }: any) {
  return (
    <ChakraProvider resetCSS colorModeManager={manager} theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      cookies: context.req.headers.cookie ?? ''
    }
  }
}
