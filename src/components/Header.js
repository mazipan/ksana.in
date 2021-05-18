import { Link, Flex, Heading, useColorMode } from "@chakra-ui/react";

import { bgColor } from "../constants/colors";
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
      zIndex="2"
      bg={bgColor[colorMode]}
    >
      <Link
        href={"/"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Gotu
        </Heading>
      </Link>

      <Flex justifyContent="space-between" alignItems="center">
        {/* <Button
          px={6}
          mr="4"
          color={'white'}
          bg={'blue.400'}
          _hover={{
            bg: 'blue.500'
          }}
          _focus={{
            bg: 'blue.500'
          }}
          as={'a'}
          href={'/sign-in'}
        >
          Sign In
        </Button> */}
        <DarkModeSwitch />
      </Flex>
    </Flex>
  );
};
