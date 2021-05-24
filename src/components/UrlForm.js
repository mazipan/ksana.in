import { useState } from "react";
import {
  FormControl,
  Text,
  FormHelperText,
  Box,
  Stack,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Auth } from "@supabase/ui";

import { supabase } from "../libs/supabase";
import { useAlertContext } from "../context/Alert";

export const UrlForm = ({}) => {
  const { user } = Auth.useUser();
  const { showAlert } = useAlertContext();

  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [isCheckPass, setIsCheckPass] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeUrl = (e) => {
    const value = e.target.value;
    setUrl(value);
  };

  const handleChangeSlug = (e) => {
    const value = e.target.value;
    setSlug(value);
  };

  const checkIsEmpty = () => {
    if (url === "" || slug === "") {
      setErrorText("URL and slug can not be empty");
      return true;
    }

    setErrorText("");
    return false;
  };

  const handleCheckAvailability = async () => {
    setLoading(true);
    const isEmpty = checkIsEmpty();
    if (!isEmpty) {
      setErrorText("");

      const { error: errorRealSlug } = await supabase
        .from("urls")
        .select("real_url,slug")
        .eq("slug", slug)
        .single();

      if (errorRealSlug) {
        setIsCheckPass(true);
        setErrorText("");
      } else {
        setErrorText(`Slug ${slug} is already in used`);
      }
    }
    setLoading(false);
  };

  const handleSaveNew = async () => {
    setLoading(true);
    const isEmpty = checkIsEmpty();
    if (!isEmpty) {
      const { data, error: errorInsert } = await supabase.from("urls").insert([
        {
          real_url: url,
          slug: slug,
          user_id: user?.id || uuidv4(),
        },
      ]);

      if (!errorInsert) {
        showAlert({
          title: "Success insert new link",
          message: "New link was already saved to our database",
        });

        setUrl("");
        setSlug("");
        setIsCheckPass(false);
        setErrorText("");
      } else {
        showAlert({
          title: "Error insert new link",
          message: `Error: ${errorInsert.message}`,
        });
      }
    }
    setLoading(false);
  };

  return (
    <Box width={{ base: "100%" }}>
      <Stack spacing={2} direction={{ base: "column" }}>
        <FormControl id="url" isRequired>
          <Input
            isRequired
            isInvalid={Boolean(errorText)}
            size="lg"
            name="url"
            placeholder={"Type your ugly url here"}
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            border={0}
            _focus={{
              bg: "whiteAlpha.300",
            }}
            value={url}
            onChange={handleChangeUrl}
          />
        </FormControl>

        <FormControl id="slug" isRequired>
          <Input
            isRequired
            isInvalid={Boolean(errorText)}
            size="lg"
            name="slug"
            placeholder={"Type the new beauty slug here"}
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            border={0}
            _focus={{
              bg: "whiteAlpha.300",
            }}
            value={slug}
            onChange={handleChangeSlug}
          />
          <FormHelperText>
            No need to add / as a prefix, only the slug. E.g: mazipan, twitter,
            etc
          </FormHelperText>
        </FormControl>

        {errorText && (
          <Text color="red.300" fontSize="xs">
            Error: {errorText}
          </Text>
        )}

        {isCheckPass ? (
          <Button
            isLoading={loading}
            loadingText="Processing"
            size="lg"
            px={6}
            color={"white"}
            bg={"green.400"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
            onClick={handleSaveNew}
          >
            Save the url
          </Button>
        ) : (
          <Button
            isLoading={loading}
            loadingText="Processing"
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
            Check availability
          </Button>
        )}
      </Stack>
    </Box>
  );
};
