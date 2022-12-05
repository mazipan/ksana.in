import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ColorModeProvider } from '@chakra-ui/react'

import { Chakra } from '../Chakra'
import { initSplitbee } from 'libs/splitbee'

import './styles.css'

import { AlertProvider } from 'context/Alert'

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initSplitbee()
    }
  }, [])

  return (
    // @ts-ignore
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
