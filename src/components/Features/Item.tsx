import { ReactElement } from 'react'
import { Text, Stack, Flex, useColorModeValue } from '@chakra-ui/react'

export interface IFeatureProps {
  title: string
  text: string
  icon: ReactElement
}

export function Item({ title, text, icon }: IFeatureProps) {
  const textColor = useColorModeValue('gray.500', 'gray.300')

  return (
    <Stack spacing="2" align="center">
      <Flex
        mb={1}
        w={16}
        h={16}
        bg={'gray.100'}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={textColor} textAlign="center">
        {text}
      </Text>
    </Stack>
  )
}
