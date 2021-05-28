import { Spinner } from '@chakra-ui/react'

export function LoadingSpinner() {
  return (
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="orange.400" size="xl" />
  )
}
