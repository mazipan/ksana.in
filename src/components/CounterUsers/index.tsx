import { Container, Heading, Stack } from '@chakra-ui/react'

import { LoadingSkeleton } from '../CounterUrls/LoadingSkeleton'
import { Counter } from './Counter'
import useCounter from 'hooks/useCounter'

export function CounterUsers() {
  const { isLoading, users } = useCounter()

  return (
    <Container maxW={'5xl'} mx="auto" as="section" mt="16">
      <Stack p={4} spacing="16">
        <Heading textAlign="center" as="h3">
          Telah Melayani
        </Heading>

        {isLoading && <LoadingSkeleton />}
        {!isLoading && <Counter count={users} />}
      </Stack>
    </Container>
  )
}
