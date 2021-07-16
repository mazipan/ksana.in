import { GetServerSideProps } from 'next'
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react'

import theme from './theme'

export function Chakra({ cookies, children }: any) {
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager

  return (
    <ChakraProvider resetCSS colorModeManager={colorModeManager} theme={theme}>
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
