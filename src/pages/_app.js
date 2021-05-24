import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import "@fontsource/poppins/400.css";

import theme from "../theme";
import { AlertProvider } from "../context/Alert";

function GotoApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default GotoApp;
