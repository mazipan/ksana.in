import { List, ListItem, useColorModeValue, HStack, Skeleton } from '@chakra-ui/react'

export function LoadingSkeleton() {
  const data = [1, 2, 3]
  const bgBox = useColorModeValue('white', 'gray.800')

  return (
    <List spacing={3}>
      {data.map((d: number) => (
        <ListItem
          key={d}
          w={'full'}
          bg={bgBox}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          p={6}
        >
          <Skeleton height="30px" mb="4" />

          <Skeleton height="10px" mb="1" />
          <Skeleton height="10px" />

          <HStack spacing={2} mt={4}>
            <Skeleton height="40px" width="40px" />
            <Skeleton height="40px" width="40px" />
            <Skeleton height="40px" width="40px" />
            <Skeleton height="40px" width="40px" />
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}
