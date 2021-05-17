import { Flex, Heading, useColorMode } from "@chakra-ui/react";

import { bgColor } from '../constants/colors'
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      p="4"
      as="header"
      bg={bgColor[colorMode]}
    >
      <Heading
        as="h1"
        size="2xl"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Gootoo
      </Heading>
      <DarkModeSwitch />
    </Flex>
  );
};
