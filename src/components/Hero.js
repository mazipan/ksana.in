import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

export const Hero = () => {
  return (
    <Container maxW={"5xl"} as="section" mt="20">
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          as="h2"
          fontWeight={700}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Beautify your links{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            made easy
          </Text>
        </Heading>

        <Text
          color={"gray.500"}
          maxW={"3xl"}
          fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
        >
          No register needed, share the beautiful links to everyone confidently
          now.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            color={"white"}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            _hover={{
              bgGradient: "linear(to-r, #7928CA, #FF0080)",
            }}
          >
            Get started
          </Button>
          <Button rounded={"full"} px={6}>
            Register
          </Button>
        </Stack>
        <Flex w={"full"}></Flex>
      </Stack>
    </Container>
  );
};
