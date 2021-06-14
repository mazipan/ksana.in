import { Stack, StackProps } from '@chakra-ui/react'

export function Main(props: StackProps) {
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
