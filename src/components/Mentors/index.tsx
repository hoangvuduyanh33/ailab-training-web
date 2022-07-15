import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { userApi } from "src/services";
import { InternalLink } from "../common/InternalLink";
import PageLayout from "../common/PageLayout";
import { timestampToDate } from "../utils/time";
import AddMentorModal from "./AddMentorModal";

const colWidth = ["40%", "25%", "20%", "15%", "20%"];

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoading] = useState(false);
  const [numSubmit, setNumSubmit] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    setLoading(true);
    try {
      userApi.getMentor({
      }).then((data: any) => {
        console.log("data = ", data);
        setMentors(data);
      });
    } catch (e) {
      console.log("e = ", e);
    } finally {
      setLoading(false);
    }
  }, []);
  const increaseSubmit = () => {
    setNumSubmit(numSubmit + 1);
  }
  if (loadingMentors) {
    return <></>;
  }
  return (
    <PageLayout>
      <Box width="1200px" borderRadius="16px" bgColor={"gray.700"}>
        <Flex
          flexDir="row"
          alignSelf={"center"}
          alignItems={"center"}
          width="100%"
          height="80px"
          bgColor="gray.700"
          borderTopRadius="16px"
          _hover={{ bgColor: "gray.800" }}
          px="50px"
        >
          <Flex fontSize={"30px"}>Mentors</Flex>
          <Flex fontSize="16px" color={"whiteAlpha.500"} ml={5}>
            {mentors.length} Mentors
          </Flex>
          <Spacer />
          <Button colorScheme="primary" onClick={() => { onOpen(); }}>
            Add mentor
          </Button>
          <AddMentorModal isOpen={isOpen} onClose={() => { increaseSubmit(); onClose(); }} />
        </Flex>
        <Divider />
        <Flex
          flexDir="row"
          alignItems={"center"}
          width="100%"
          height="80px"
          color={"whiteAlpha.500"}
          fontSize="md"
          _hover={{ bgColor: "gray.800" }}
          px="50px"
        >
          <Flex width={colWidth[0]}>Name</Flex>
          <Flex width={colWidth[1]}>Email</Flex>
          <Flex width={colWidth[2]}>Phone number</Flex>
          <Flex width={colWidth[3]}>Joined At</Flex>
        </Flex>
        {mentors.map((mentor: any) => {
          return (
            <>
              <Divider />
              <Flex
                flexDir="row"
                alignItems={"center"}
                width="100%"
                height="80px"
                color={"whiteAlpha.500"}
                fontSize="md"
                _hover={{ bgColor: "gray.800" }}
                px="50px"
              >
                <Flex width={colWidth[0]}>
                  <InternalLink href={`/user/${mentor.userId}`}>
                    {mentor.firstName + " " + mentor.lastName}
                  </InternalLink>
                </Flex>
                <Flex width={colWidth[1]}>{mentor.email}</Flex>
                <Flex width={colWidth[2]}>{mentor.phoneNumber}</Flex>
                <Flex width={colWidth[3]}>
                  {mentor.joinedAt ? timestampToDate(mentor.joinedAt) : "--"}
                </Flex>
              </Flex>
            </>
          );
        })}
      </Box>
    </PageLayout>
  );
};

export default Mentors;
