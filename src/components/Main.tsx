import { Stack } from '@chakra-ui/react'

export function Main(props: any) {
  return (
    <Stack
      spacing="1.5rem"
      width="100%"
      maxWidth="48rem"
      mt="-45vh"
      pt="8rem"
      px="1rem"
      {...props}
    />
  )
}
