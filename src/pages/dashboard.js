import { Stack } from "@chakra-ui/react";

import { HiUser } from "../components/HiUser";
import { UrlForm } from "../components/UrlForm";
import { UrlList } from "../components/UrlList";
import { LayoutAuth } from "../components/LayoutAuth";

const Dashboard = () => (
  <LayoutAuth height="100vh">
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
      <HiUser />
      <UrlForm />
      <UrlList />
    </Stack>
  </LayoutAuth>
);

export default Dashboard;
