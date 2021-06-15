import { Flex, Text, Stack, useColorModeValue } from '@chakra-ui/react'

export function Counter({ count = 0 }) {
  const textColor = useColorModeValue('gray.500', 'gray.300')
  const arrString: string[] = count.toString().split('')

  return (
    <Stack spacing="2">
      <Stack spacing="2" direction="row" alignItems="center" justify="center" wrap="wrap">
        {arrString.map((c, index) => (
          <Flex
            key={index}
            as="div"
            width={{ base: '40px', md: '60px' }}
            height={{ base: '40px', md: '60px' }}
            fontWeight={700}
            fontSize={{ base: '2xl', md: '4xl' }}
            lineHeight={'110%'}
            bg="orange.400"
            color="white"
            rounded={'md'}
            display="flex"
            alignItems="center"
            justify="center"
          >
            {c}
          </Flex>
        ))}
      </Stack>
      <Text textAlign="center" color={textColor}>
        Tautan telah dipercantik oleh ksana.in dan akan terus bertambah
      </Text>
    </Stack>
  )
}
