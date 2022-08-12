import { GetServerSideProps } from 'next'
import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react'

import { PropsWithChildren } from 'react'
import theme from './theme'

const manager = createLocalStorageManager('theme')

export function Chakra({ children, cookies }: PropsWithChildren<{ cookies: any }>) {
  return (
    <ChakraProvider resetCSS colorModeManager={manager} theme={theme} cookies={cookies}>
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
