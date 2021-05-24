import { useState } from "react";
import { Box, Stack, Input, Button, useColorModeValue } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Auth } from "@supabase/ui";

import { supabase } from "../libs/supabase";

export const UrlForm = ({}) => {
  const { user } = Auth.useUser();
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [isCheckPass, setIsCheckPass] = useState(false);

  const handleChangeUrl = (e) => {
    const value = e.target.value;
    setUrl(value);
  };

  const handleChangeSlug = (e) => {
    const value = e.target.value;
    setSlug(value);
  };

  const handleCheckAvailability = async () => {
    if (url) {
      const { data, error: errorRealSlug } = await supabase
        .from("urls")
        .select()
        .match({ real_url: url });

      console.log(data);

      if (!errorRealSlug) {
        setIsCheckPass(true);
      }
    }
  };

  const handleSaveNew = async () => {
    if (url && slug) {
      console.log("user want to insert", user);
      const { data, error } = await supabase.from("urls").insert([
        {
          inserted_at: new Date().toISOString,
          real_url: url,
          slug: slug,
          user_id: user?.id || uuidv4(),
        },
      ]);
      console.log("insert response", data, error);
    }
  };

  return (
    <Box width={{ base: "100%", md: "4xl" }}>
      <Stack spacing={2} direction={{ base: "column", md: "row" }}>
        <Input
          size="lg"
          placeholder={"Type your ugly url here"}
          bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
          border={0}
          _focus={{
            bg: "whiteAlpha.300",
          }}
          value={url}
          onChange={handleChangeUrl}
        />

        <Input
          size="lg"
          placeholder={"Type the new beauty slug here"}
          bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
          border={0}
          _focus={{
            bg: "whiteAlpha.300",
          }}
          value={slug}
          onChange={handleChangeSlug}
        />

        {isCheckPass ? (
          <Button
            size="lg"
            px={6}
            color={"white"}
            bg={"blue.400"}
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
            onClick={handleSaveNew}
          >
            Save now
          </Button>
        ) : (
          <Button
            size="lg"
            px={6}
            color={"white"}
            bg={"blue.400"}
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
            onClick={handleCheckAvailability}
          >
            Check
          </Button>
        )}
      </Stack>
    </Box>
  );
};
