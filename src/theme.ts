import { extendTheme, ChakraTheme } from '@chakra-ui/react'
import { createBreakpoints, BaseBreakpointConfig } from '@chakra-ui/theme-tools'

const breakpoints: BaseBreakpointConfig = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
})

const theme: ChakraTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  colors: {
    black: '#16161D'
  },
  fonts: {
    heading:
      "'Playfair Display', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    body: "'Work Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
  },
  breakpoints
})

export default theme
