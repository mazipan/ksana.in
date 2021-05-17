import { Flex, useColorMode } from '@chakra-ui/react'

import { bgColor, textColor } from '../constants/colors'

export const Container = (props) => {
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
