import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Spacer,
  useDisclosure,
  useRadio,

} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { InternalLink } from "src/components/common/InternalLink";
import { timestampToDate } from "src/components/utils/time";
import { useMentees } from "src/hooks/useMentees";
import { taskApi, userApi } from "src/services";
import { userSelector } from "src/store/user";
import ModalLayout from "../common/ModalLayout";

const colWidth = ["20%", "20%", "20%", "20%", "20%"];

interface MentorAssignTaskModalProps {
  isOpen: boolean;
  onClose: any;
  mentorId: string;
  assignedMentees: [];
}


const MentorAssignTaskModal = (props: any) => {
  const { isOpen, onClose, mentorId, assignedMentees } = props;
  const [mentees, loading] = useMentees();
  const { userId } = useAppSelector(userSelector);
  const [unassignedMentees, setUnassignedMentees] = useState([]);
  const { taskId } = useParams();
  console.log("mentees = ", mentees, "assignedMentees = ", assignedMentees);
  useEffect(() => {
    console.log("mentees = ", mentees, "assignedMentees = ", assignedMentees)
    setUnassignedMentees(mentees.filter((t: any) => {
      if (!assignedMentees) {
        return true
      }
      console.log("assignedMentees = ", assignedMentees);
      for (let i = 0; i < assignedMentees.length; i++) {
        if (assignedMentees[i].userId == t.userId) {
          return false;
        }
      }
      return true;
    }))
  }, [assignedMentees, mentees])
  const { isOpen: isConfirmOpen, onClose: onConfirmClose, onOpen: onConfirmOpen } = useDisclosure();
  const [menteeName, setMenteeName] = useState("");
  const [menteeId, setMenteeId] = useState("");
  const [status, setStatus] = useState(0);
  const ConfirmModal = ({ isOpen, onClose, menteeName }: { isOpen: boolean; onClose: any; menteeName: string }) => {
    return (
      <ModalLayout isOpen={isOpen} onClose={onClose} minWidth="550px">
        <ModalHeader fontSize={"30px"}>
          Confirm
        </ModalHeader>
        <ModalBody>
          {(status == 0 || status == 1) && `Confirm assign task to ${menteeName}`}
          {(status == 2) && `Assign task success`}
        </ModalBody>
        <ModalFooter>
          <Flex flexDir={"row"}>
            <Button onClick={onClose} ml={2}>Cancel</Button>
            <Button colorScheme="primary"
              isLoading={(status == 1)}
              onClick={() => {
                setStatus(1);
                taskApi.assignTask({
                  mentorId: userId,
                  menteeId: menteeId,
                  taskId: taskId,
                }).finally(() => {
                  setStatus(2);
                  setTimeout(() => {
                    setStatus(0)
                  }, 2000)
                  onClose();
                })
              }}>Confirm</Button>
          </Flex>
        </ModalFooter>
      </ModalLayout >
    )
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} minWidth="1350px">
      <ModalHeader fontSize={"30px"}>
        Assign Task
      </ModalHeader>
      <ModalBody>
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
              {unassignedMentees.length} Mentees
            </Flex>
            <Spacer />
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
          {unassignedMentees.map((mentee: any) => {
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
                  onClick={() => {
                    setMenteeName(mentee.firstName + " " + mentee.lastName);
                    setMenteeId(mentee.userId);
                    onConfirmOpen();
                  }}
                  cursor="pointer"
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
          <ConfirmModal isOpen={isConfirmOpen} onClose={onConfirmClose} menteeName={menteeName} />
        </Box>

      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </ModalLayout >
  )
}

const MentorAddMentees = () => {
  const [mentees, setMentees] = useState([]);
  const [loadingMentees, setLoading] = useState(false);
  const [numSubmit, setNumSubmit] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userId } = useAppSelector(userSelector);
  const { taskId } = useParams();
  useEffect(() => {
    setLoading(true);
    try {
      console.log("userId = ", userId)
      userApi.getMentee({
        mentorId: userId,
        taskId: taskId,
      }).then((data: any) => {
        console.log("data = ", data);
        setMentees(data || []);
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
        <Button colorScheme={"primary"} width="100px" onClick={onOpen}>Add mentee</Button>
        <MentorAssignTaskModal isOpen={isOpen} onClose={onClose} mentorId={userId} assignedMentees={mentees || []} />
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

export default MentorAddMentees;