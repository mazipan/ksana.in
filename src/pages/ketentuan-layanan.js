import { VStack, Heading, Text } from "@chakra-ui/react";

import { BRAND } from "../constants/texts";
import { Layout } from "../components/Layout";

const Terms = () => (
  <Layout height="100vh">
    <VStack spacing={2} textAlign="center" as="section" mt="32">
      <Heading
        as="h1"
        fontWeight={700}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        Ketentuan Layanan
      </Heading>
      <Heading
        as="h2"
        fontWeight={700}
        fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
        lineHeight={"110%"}
      >
        {BRAND}
      </Heading>
    </VStack>
  </Layout>
);

export default Terms;
