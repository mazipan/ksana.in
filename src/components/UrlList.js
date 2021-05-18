import { Box, Stack } from "@chakra-ui/react";

import { useUrlData } from "../hooks/useUrlData";

export const UrlList = ({}) => {
  const data = useUrlData();

  return (
    <Stack spacing={8} mx={"auto"} mt="20" maxW={"lg"} py={12} px={6}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Stack>
  );
};
