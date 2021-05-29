import { Container, Heading, Stack } from '@chakra-ui/react'

import useCounter from 'hooks/useCounter'
import { Counter } from './Counter'

export function CounterUrls() {
  const { isLoading, urls } = useCounter()

  return (
    <Container maxW={'5xl'} mx="auto" as="section" mt="16">
      <Stack p={4} spacing="16">
        <Heading textAlign="center" as="h3">
          Telah Mempercantik
        </Heading>
        {!isLoading && <Counter count={urls} />}
      </Stack>
    </Container>
  )
}
