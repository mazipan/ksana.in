import { ChangeEvent } from 'react'
import { Box, Stack, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

import { FiSearch } from 'react-icons/fi'

interface ISearchInputProps {
  searchText: string
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export function SearchInput({ searchText, onChangeSearch }: ISearchInputProps) {
  return (
    <Box width={{ base: '100%' }}>
      <Stack spacing={4}>
        <InputGroup>
          <Input
            size="lg"
            name="searchText"
            placeholder="Cari tautan kamu"
            variant="filled"
            value={searchText}
            onChange={onChangeSearch}
          />
          <InputRightElement
            fontSize="2em"
            color="orange.400"
            mr="2"
            mt="1"
            children={<FiSearch />}
          />
        </InputGroup>
      </Stack>
    </Box>
  )
}
