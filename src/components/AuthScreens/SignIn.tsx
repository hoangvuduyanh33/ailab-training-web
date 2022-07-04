import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/hooks";
import { setName, setRole, setEmail as setGlobalEmail } from "src/store/user";
import { fetchRole } from "src/utils/services";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signIn = () => {
    fetchRole(email).then((role) => {
      console.log("role = ", role);
      dispatch(setRole(role));
    });
    dispatch(setGlobalEmail(email));
    dispatch(setName("Hoang Vu Duy Anh"));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Box
      width="2000px"
      alignContent={"center"}
      alignItems="center"
      height={"1280px"}
    >
      <Flex
        margin={"auto"}
        mt="100px"
        width="500px"
        flexDir={"column"}
        alignSelf="center"
        alignContent="center"
        alignItems="center"
        bgColor={"gray.700"}
        px="20px"
        py="20px"
        borderRadius="16px"
      >
        <Flex fontSize={"30px"}>Sign In</Flex>
        <FormControl as="fieldset" fontSize="xl">
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            px={3}
            py={4}
            mt={3}
            fontSize="md"
          />
          {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            mt={3}
            py={4}
            fontSize="md"
          />
          <Flex flexDir={"column"} mt={3} alignItems="center">
            <Button
              colorScheme={"primary"}
              borderRadius="10px"
              width={"100%"}
              onClick={signIn}
            >
              Sign In
            </Button>
            <Flex flexDir={"row"} width="100%" mt={2}>
              <Spacer />
              <Flex
                fontSize={"md"}
                _hover={{ color: "primary.200" }}
                cursor="pointer"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Register now
              </Flex>
            </Flex>
          </Flex>
        </FormControl>
      </Flex>
    </Box>
  );
};
