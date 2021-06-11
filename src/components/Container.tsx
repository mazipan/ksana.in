import { Flex, useColorMode, ContainerProps } from '@chakra-ui/react'

import { bgColor, textColor } from 'constants/colors'

export function Container(props: ContainerProps) {
  const { colorMode } = useColorMode()

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={textColor[colorMode]}
      {...props}
    />
  )
}
