import { useState } from "react";
import { Auth } from "@supabase/ui";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useAlertContext } from "../context/Alert";
import { supabase } from "../libs/supabase";

export const AuthForm = ({ state = "login" }) => {
  const { user: userInitial } = Auth.useUser();
  const { showAlert } = useAlertContext();

  const [internalState, setInternalState] = useState(state);
  const [isLogin, setIsLogin] = useState(state === "login");

  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, setLoginUser] = useState(userInitial);

  const toggleState = () => {
    if (state === "login") {
      setInternalState("register");
    } else {
      setInternalState("login");
    }
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    else {
      setLoginUser(null);

      // window.sessionStorage.removeItem("goto-session");
      // window.sessionStorage.removeItem("goto-user");
    }
  };

  const checkIsEmpty = () => {
    if (email === "" || password === "") {
      setErrorForm("Email or password can not empty.");
      return true;
    }

    setErrorForm("");
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);

    const isEmpty = checkIsEmpty();

    if (!isEmpty) {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    }

    setLoading(false);
  };

  const processResponse = ({ user, session, error }) => {
    if (error) {
      console.error(error.message);
      setErrorForm(error.message);
      return false;
    }

    if (session && !error) {
      setLoginUser({
        id: user.id,
        email: user.email,
      });

      // window.sessionStorage.setItem("goto-session", JSON.stringify(session));
      // window.sessionStorage.setItem(
      //   "goto-user",
      //   JSON.stringify({
      //     id: user.id,
      //     email: user.email,
      //   })
      // );

      showAlert({
        title: `${isLogin ? "Login" : "Register"} success`,
        message: `${
          isLogin
            ? "Welcome back to your account!"
            : "Thank you for signing up! We will send a confirmation email to activate your account."
        }`,
      });
    }
  };

  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    processResponse({ user, session, error });
  };

  const handleRegister = async () => {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    processResponse({ user, session, error });
  };

  const handleResetPassword = async () => {
    const { user, session, error } = await supabase.auth.resetPasswordForEmail(
      email
    );

    if (!error) {
      showAlert({
        title: "Forgot password",
        message: "Link to reset password has been sent to your email",
      });
    }
  };

  return (
    <>
      {loginUser ? (
        <Stack spacing={8} mx={"auto"} mt="20" maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Welcome, {loginUser.email}</Heading>
          </Stack>

          <Stack spacing={2} direction={"row"}>
            <Button
              rounded="full"
              px={6}
              color={"white"}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              _hover={{
                bgGradient: "linear(to-r, #7928CA, #FF0080)",
              }}
              as={"a"}
              href={"/dashboard"}
            >
              Visit my dashboard
            </Button>
          </Stack>
        </Stack>
      ) : (
        <>
          <Stack spacing={8} mx={"auto"} mt="20" maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>
                {isLogin ? "Sign in to your account" : "Sign up new account"}
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    isInvalid={Boolean(errorForm)}
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    autoComplete="username"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    isInvalid={Boolean(errorForm)}
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                </FormControl>

                {errorForm && (
                  <Text color="red.300" fontSize="xs">
                    Error: {errorForm}
                  </Text>
                )}

                <Stack spacing={10}>
                  {isLogin ? (
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Button
                        variant="link"
                        as={Link}
                        color={"blue.400"}
                        onClick={handleResetPassword}
                      >
                        Forgot password?
                      </Button>
                    </Stack>
                  ) : null}

                  <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    w="full"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSubmit}
                  >
                    {isLogin ? "Sign in" : "Sign up"}
                  </Button>
                </Stack>

                {isLogin ? (
                  <Stack direction="row" align={"center"} justify={"center"}>
                    <Text>New to Gotu? </Text>
                    <Button
                      variant="link"
                      as={Link}
                      color={"blue.400"}
                      onClick={toggleState}
                    >
                      Sign up
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" align={"center"} justify={"center"}>
                    <Text>Already have account? </Text>
                    <Button
                      variant="link"
                      as={Link}
                      color={"blue.400"}
                      onClick={toggleState}
                    >
                      Sign in
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};
