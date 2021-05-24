import { Box, Stack, Text } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

export const HiUser = ({}) => {
  const { user } = Auth.useUser();

  return (
    <Box width={{ base: "100%", md: "4xl" }}>
      {user && (
        <Stack mb={4} spacing={2} direction={{ base: "column", md: "row" }}>
          <Text>Hi, {user.email}</Text>
        </Stack>
      )}
    </Box>
  );
};
