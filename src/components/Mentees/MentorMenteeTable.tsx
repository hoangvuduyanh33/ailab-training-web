import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { userApi } from "src/services";
import { userSelector } from "src/store/user";
import { InternalLink } from "../common/InternalLink";
import PageLayout from "../common/PageLayout";
import { timestampToDate } from "../utils/time";
import AddMenteeModal from "./AddMenteeModal";

const colWidth = ["20%", "20%", "20%", "20%", "20%"];

const MentorMenteeTable = () => {
  const [mentees, setMentees] = useState([]);
  const [loadingMentees, setLoading] = useState(false);
  const [numSubmit, setNumSubmit] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userId } = useAppSelector(userSelector);
  useEffect(() => {
    setLoading(true);
    try {
      console.log("userId = ", userId)
      userApi.getMentee({
        mentorId: userId,
      }).then((data: any) => {
        console.log("data = ", data);
        setMentees(data);
      });
    } catch (e) {
      console.log("e = ", e);
    } finally {
      setLoading(false);
    }
  }, [numSubmit]);
  const increaseSubmit = () => {
    setNumSubmit(numSubmit + 1);
  }
  if (loadingMentees) {
    return <></>;
  }

  return (
    <Box width="1300px" borderRadius="16px" bgColor={"gray.700"}>
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
        <Flex fontSize={"30px"}>Mentees</Flex>
        <Flex fontSize="16px" color={"whiteAlpha.500"} ml={5}>
          {mentees.length} Mentees
        </Flex>
        <Spacer />
        <AddMenteeModal isOpen={isOpen} onClose={() => { increaseSubmit(); onClose(); }} />
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
        <Flex width={colWidth[3]}>Class</Flex>
        <Flex width={colWidth[4]}>Joined At</Flex>
      </Flex>
      {mentees.map((mentee: any) => {
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
                <InternalLink href={`/user/${mentee.userId}`}>
                  {mentee.firstName + " " + mentee.lastName}
                </InternalLink>
              </Flex>

              <Flex width={colWidth[1]}>{mentee.email}</Flex>
              <Flex width={colWidth[2]}>{mentee.phoneNumber}</Flex>
              <Flex width={colWidth[3]}>
                {mentee.class ? mentee.class : "--"}
              </Flex>
              <Flex width={colWidth[4]}>
                {mentee.createdAt ? timestampToDate(mentee.createdAt) : "--"}
              </Flex>
            </Flex>
          </>
        );
      })}
    </Box>
  )
}

export default MentorMenteeTable;