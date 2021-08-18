import { Stack, Text, useColorModeValue, IconButton, VStack } from '@chakra-ui/react'

import { HiChartBar, HiLink } from 'react-icons/hi'

import { IUrl } from 'interfaces/IUrl'

interface ITotalStatsProps {
  data: IUrl[]
}

export function TotalStats({ data }: ITotalStatsProps) {
  const bgBox = useColorModeValue('white', 'gray.800')
  const sum = data.reduce((a: number, b: IUrl) => a + b.hit, 0)

  return (
    <>
      {data && data.length > 0 ? (
        <Stack direction="row" justifyContent="center">
          <VStack
            w="full"
            bg={bgBox}
            boxShadow={'2xl'}
            rounded={'md'}
            justifyContent="center"
            textAlign="center"
            overflow={'hidden'}
            py="2"
            position="relative"
          >
            <Text fontSize="xs">Total Tautan</Text>
            <Text fontSize="2xl" color="orange.400" fontWeight="700" zIndex="1">
              {new Intl.NumberFormat('id-ID').format(data.length)}
            </Text>

            <IconButton
              aria-label="Tautan"
              bg="orange.400"
              color="white"
              borderRadius="3xl"
              position="absolute"
              bottom="-.2em"
              right="-.2em"
              opacity="0.5"
              w="12"
              h="12"
              margin="0"
              fontSize="4xl"
              zIndex="0"
              icon={<HiLink />}
            />
          </VStack>
          <VStack
            w="full"
            bg={bgBox}
            boxShadow={'2xl'}
            rounded={'md'}
            justifyContent="center"
            textAlign="center"
            overflow={'hidden'}
            py="2"
            position="relative"
          >
            <Text fontSize="xs">Total Kunjungan</Text>
            <Text fontSize="2xl" color="orange.400" fontWeight="700" zIndex="1">
              {new Intl.NumberFormat('id-ID').format(sum)}
            </Text>

            <IconButton
              aria-label="Tautan"
              bg="orange.400"
              color="white"
              borderRadius="3xl"
              position="absolute"
              bottom="-.2em"
              right="-.2em"
              opacity="0.5"
              w="12"
              h="12"
              margin="0"
              fontSize="4xl"
              zIndex="0"
              icon={<HiChartBar />}
            />
          </VStack>
        </Stack>
      ) : null}
    </>
  )
}
