import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

import '@fontsource/poppins'

import { initSplitbee } from 'libs/splitbee'

import theme from '../theme'
import { AlertProvider } from 'context/Alert'

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initSplitbee()
    }
  }, [])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false
        }}
      >
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default App
