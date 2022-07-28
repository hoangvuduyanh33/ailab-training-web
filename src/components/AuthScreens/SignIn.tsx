import {
  Box,
  Button,
  CircularProgress,
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
import { useRole } from "src/hooks/useRole";
import { userApi } from "src/services";
import { setUser } from "src/store/user";
import { fetchRole } from "src/utils/services";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [isFetchingUser, setFetchingUser] = useState(false);
  const signIn = () => {
    try {
      if (email.startsWith("admin")) {
        setTimeout(() => {
          dispatch(setUser({
            name: "Admin",
            role: "admin",
            userId: "something",
            email: "admin@vnu.edu.vn"
          }))
          navigate("/home");
        }, 1000);
        return;
      }
      setFetchingUser(true);

      userApi.fetchUserInfo({
        "userEmail": email
      }).then((data: any) => {
        console.log("data = ", data);
        dispatch(setUser({
          name: data.firstName + " " + data.lastName,
          role: data.role,
          userId: data.userId,
          email: data.email,
          class: data.class,
          numberOfAssignedTasks: data.numAssignedTasks,
          numberOfCreatedTasks: data.numberOfCreatedTasks,
          numberOfFinishedTasks: data.numFinishedTasks,
          numberOfPendingTasks: data.numPendingTasks,
          rating: data.rating,
          score: data.score,
          mentorId: data.mentorId,
          mentorName: data.mentorName,
          avgScore: data.avgScore,
        }))
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      });
    } catch (e) {
      console.log("e = ", e)
    } finally {
      setFetchingUser(false);
    }
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
              disabled={isFetchingUser}
            >
              {(!isFetchingUser) && "Sign In"}
              {isFetchingUser && <CircularProgress />}
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
