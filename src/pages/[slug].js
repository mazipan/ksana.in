import { Box, Stack, Button, Heading } from "@chakra-ui/react";

import { Layout } from "../components/Layout";

import { supabase } from "../libs/supabase";

function SlugPage() {
  return (
    <Layout height="100vh">
      <Box width="100%">
        <Stack spacing={8} mx={"auto"} mt="20" py={12} px={6}>
          <Stack align={"center"} spacing={2} direction={"column"}>
            <Heading fontSize={"4xl"}>The link is not available</Heading>

            <Button
              rounded="full"
              px={6}
              color={"white"}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              _hover={{
                bgGradient: "linear(to-r, #7928CA, #FF0080)",
              }}
              as={"a"}
              href={"/"}
            >
              Go to homepage
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const { data } = await supabase
    .from("urls")
    .select("real_url,slug,hit")
    .eq("slug", slug)
    .single();

  if (data && data.real_url) {
    // update hit field for a simple stats
    await supabase
      .from("urls")
      .update({ hit: data.hit + 1 })
      .match({ slug: slug });

    return {
      redirect: {
        destination: data.real_url,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default SlugPage;
