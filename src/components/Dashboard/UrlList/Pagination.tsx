import { Flex, Text, Button } from '@chakra-ui/react'

interface PaginationProps {
  page: number
  totalPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPage, onPageChange }: PaginationProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Button
        onClick={() => {
          if (page > 1) {
            onPageChange(page - 1)
          }
        }}
        color={'white'}
        bg={'orange.400'}
        _hover={{
          bg: 'orange.500'
        }}
        _focus={{
          bg: 'orange.500'
        }}
        borderRadius="md"
      >
        Prev
      </Button>
      <Text>
        Page: {page} / {totalPage}
      </Text>
      <Button
        onClick={() => {
          if (page < totalPage) {
            onPageChange(page + 1)
          }
        }}
        color={'white'}
        bg={'orange.400'}
        _hover={{
          bg: 'orange.500'
        }}
        _focus={{
          bg: 'orange.500'
        }}
        borderRadius="md"
      >
        Next
      </Button>
    </Flex>
  )
}
