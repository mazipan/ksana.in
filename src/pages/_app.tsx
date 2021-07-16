import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ColorModeProvider } from '@chakra-ui/react'

import { initSplitbee } from 'libs/splitbee'

import './styles.css'

import { Chakra } from '../Chakra'
import { AlertProvider } from 'context/Alert'

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initSplitbee()
    }
  }, [])

  return (
    <Chakra cookies={pageProps.cookies}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false
        }}
      >
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ColorModeProvider>
    </Chakra>
  )
}

export default App
