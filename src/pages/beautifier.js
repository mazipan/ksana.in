import {
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

import { LayoutAuth } from "../components/LayoutAuth";
import { UrlForm } from "../components/UrlForm";

const Beautifier = () => {
  return (
    <LayoutAuth minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack
        spacing={8}
        mx={"auto"}
        mt="20"
        width={{ base: "100%", md: "4xl" }}
        py={12}
        px={6}
        as="section"
        align={"center"}
        justify={"center"}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Beautify your link now!</Heading>
        </Stack>

        <UrlForm />
      </Stack>
    </LayoutAuth>
  );
};

export default Beautifier;
