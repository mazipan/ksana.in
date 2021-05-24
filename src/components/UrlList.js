import {
  Box,
  Heading,
  Stack,
  Link,
  Text,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

import { useUrlData } from "../hooks/useUrlData";
import { HOME } from "../constants/paths";

export const UrlList = ({}) => {
  const { user } = Auth.useUser();
  const { data } = useUrlData(user);

  return (
    <Box width={{ base: "100%", md: "4xl" }}>
      <Stack mt={8} spacing={8} width="100%">
        <Heading
          as="h3"
          size="2xl"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          My Links
        </Heading>
        {data && data.length > 0 ? (
          <List spacing={3}>
            {data.map((d) => (
              <ListItem
                key={d.slug}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                p={6}
              >
                <Link
                  as="a"
                  fontSize="xl"
                  fontWeight="700"
                  color="blue.400"
                  href={`${HOME}${d.slug}`}
                >
                  {`${HOME}${d.slug}`}
                </Link>
                <Text fontSize="small" color="gray.400">
                  {d.real_url}
                </Text>
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>Data Not Found</Text>
        )}
      </Stack>
    </Box>
  );
};
