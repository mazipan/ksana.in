import { Flex, Text, Stack, useColorModeValue } from '@chakra-ui/react'

export function Counter({ count = 0 }) {
  const arrString: string[] = count.toString().split('')

  return (
    <Stack spacing="2">
      <Flex alignItems="center" justify="center">
        {arrString.map((c, index) => (
          <Text
            key={index}
            fontWeight={700}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            lineHeight={'110%'}
            bg="orange.400"
            color="white"
            py="2"
            px="4"
            rounded={'md'}
          >
            {c}
          </Text>
        ))}
      </Flex>
      <Text textAlign="center" color={useColorModeValue('gray.500', 'gray.300')}>
        Tautan telah dipercantik oleh ksana.in dan akan terus bertambah
      </Text>
    </Stack>
  )
}
