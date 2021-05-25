import {
  Box,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { BRAND } from "../constants/texts";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      as="footer"
      width="100%"
      p="4"
    >
      <Box
        as="section"
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} py={4}>
          <Stack align={"flex-start"}>
            <Text fontWeight="700" color="orange.400" fontSize={"lg"} mb={2}>
              RESOURCES
            </Text>
            <Link href={"/tentang"}>Tentang kami</Link>
            <Link href={"/sign-in"}>Masuk</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="700" color="orange.400" fontSize={"lg"} mb={2}>
              LEGAL
            </Text>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Terms of Service</Link>
          </Stack>
        </SimpleGrid>
      </Box>

      <Box
        as="section"
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex
          as={Stack}
          py={4}
          alignItems="center"
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>
            © 2021 <Link href={"/"}>{BRAND}</Link> oleh{" "}
            <Link
              href={"https://mazipan.space/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Irfan Maulana
            </Link>
            . All rights reserved
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};
