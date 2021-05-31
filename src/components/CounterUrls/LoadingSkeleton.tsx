import { Stack, Skeleton } from '@chakra-ui/react'

export function LoadingSkeleton() {
  const data = [1, 2, 3]

  return (
    <Stack spacing="2" align="center">
      <Stack spacing="2" direction="row" alignItems="center" justify="center" wrap="wrap">
        {data.map((c) => (
          <Skeleton
            key={c}
            width={{ base: '40px', md: '60px' }}
            height={{ base: '40px', md: '60px' }}
            display="flex"
            alignItems="center"
            justify="center"
          />
        ))}
      </Stack>
      <Skeleton height="10px" width="100%" maxW={'lg'} />
      <Skeleton height="10px" width="100%" maxW={'lg'} />
    </Stack>
  )
}
