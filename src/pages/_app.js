import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import splitbee from '@splitbee/web';

import '@fontsource/poppins/400.css'

import theme from '../theme'
import { AlertProvider } from '../context/Alert'

splitbee.init()

function App ({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true
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
