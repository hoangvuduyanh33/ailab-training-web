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

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();
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
        <Flex fontSize={"30px"}>Sign Up</Flex>
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
            id="name"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            px={3}
            py={4}
            mt={3}
            fontSize="md"
          />

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
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e: any) => {
              setConfirmPassword(e.target.value);
            }}
            mt={3}
            py={4}
            fontSize="md"
          />

          <Flex flexDir={"column"} mt={3} alignItems="center">
            <Button colorScheme={"primary"} borderRadius="10px" width={"100%"}>
              Sign Up
            </Button>
            <Flex flexDir={"row"} width="100%" mt={2}>
              <Spacer />
              <Flex
                fontSize={"md"}
                _hover={{ color: "primary.200" }}
                cursor="pointer"
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Log in
              </Flex>
            </Flex>
          </Flex>
        </FormControl>
      </Flex>
    </Box>
  );
};
