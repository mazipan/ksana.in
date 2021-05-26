import { useEffect } from 'react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { register, unregister } from 'next-offline/runtime'

import '@fontsource/poppins/400.css'

import { initSplitbee } from '../libs/splitbee'

import theme from '../theme'
import { AlertProvider } from '../context/Alert'

function App ({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      register()
      initSplitbee()
    }

    return () => {
      unregister()
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
