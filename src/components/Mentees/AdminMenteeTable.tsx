import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { userApi } from "src/services";
import { InternalLink } from "../common/InternalLink";
import PageLayout from "../common/PageLayout";
import { timestampToDate } from "../utils/time";
import AddMenteeModal from "./AddMenteeModal";

const colWidth = ["20%", "20%", "15%", "15%", "15%", "20%"];

interface AssignModalProp {
  isOpen: boolean;
  onClose: any;
  menteeId: string;
  menteeName: string;
}

const colWidthModal = ["20%", "20%", "25%", "20%", "15%", "20%"];

interface ConfirmAssignModalProps {
  isOpen: boolean;
  onClose: any;
  menteeId: string;
  menteeName: string;
  mentorId: string;
  mentorName: string;
}
const ConfirmAssignModal = (props: ConfirmAssignModalProps) => {
  const { isOpen, onClose, menteeId, mentorId, menteeName, mentorName } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      closeOnEsc={false}
    >
      <ModalOverlay backdropFilter="blur(3px) !important;" />
      <ModalContent minW={"500px"}>
        <ModalHeader>
          Confirm
        </ModalHeader>
        <ModalBody width={"full"}>
          Assign Mentee {menteeName} to Mentor {mentorName}
        </ModalBody>
        <ModalFooter>
          <Flex flexDirection={"row"}>
            <Button width={"100px"} mr={2} onClick={onClose}>Cancel</Button>
            <Button colorScheme={"primary"} width="100px" onClick={onClose}>Confirm</Button>
          </Flex>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

const AssignModal = (props: AssignModalProp) => {
  const { isOpen, onClose, menteeId, menteeName } = props;
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoading] = useState(false);
  const [numSubmit, setNumSubmit] = useState(0);
  const [mentorName, setMentorName] = useState("");
  const [mentorId, setMentorId] = useState("");
  const { isOpen: isConfirmOpen, onClose: onConfirmClose, onOpen: onConfirmOpen } = useDisclosure();
  console.log("menteeId = ", menteeId, " menteeName = ", menteeName);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      closeOnEsc={false}
    >
      <ModalOverlay backdropFilter="blur(3px) !important;" />
      <ModalContent minW={"1350px"}>
        <ModalBody width={"full"}>
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
            >
              <Flex fontSize={"30px"}>Assign Mentors</Flex>
              <Flex fontSize="16px" color={"whiteAlpha.500"} ml={5}>
                {mentors.length} Mentors
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
              <Flex width={colWidthModal[0]}>Name</Flex>
              <Flex width={colWidthModal[1]}>No of Mentees</Flex>
              <Flex width={colWidthModal[2]}>Email</Flex>
              <Flex width={colWidthModal[3]}>Phone number</Flex>
              <Flex width={colWidthModal[4]}>Joined At</Flex>
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
                    <Flex width={colWidthModal[0]} cursor={"pointer"} _hover={{ color: "primary" }}
                      onClick={() => {
                        console.log("userId = ", mentor.userId);
                        console.log("name = ", mentor.name);
                        setMentorId(mentor.userId);
                        setMentorName(mentor.firstName + " " + mentor.lastName);
                        onConfirmOpen();
                      }}
                    >
                      {mentor.firstName + " " + mentor.lastName}
                    </Flex>
                    <Flex width={colWidthModal[1]}>{mentor.numMentees}</Flex>
                    <Flex width={colWidthModal[2]}>{mentor.email}</Flex>
                    <Flex width={colWidthModal[3]}>{mentor.phoneNumber}</Flex>
                    <Flex width={colWidthModal[4]}>
                      {mentor.joinedAt ? timestampToDate(mentor.joinedAt) : "--"}
                    </Flex>
                  </Flex>
                </>
              );
            })}
          </Box>
          <ConfirmAssignModal isOpen={isConfirmOpen} onClose={onConfirmClose} menteeId={menteeId} menteeName={menteeName} mentorId={mentorId} mentorName={mentorName} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}


const AdminMenteeTable = () => {
  const [mentees, setMentees] = useState([]);
  const [loadingMentees, setLoading] = useState(false);
  const [numSubmit, setNumSubmit] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menteeId, setMenteeId] = useState("");
  const [menteeName, setMenteeName] = useState("");
  const { isOpen: isAssignOpen, onClose: onAssignClose, onOpen: onAssignOpen } = useDisclosure();
  useEffect(() => {
    setLoading(true);
    try {
      userApi.getMentee({
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
        <Button colorScheme="primary" onClick={() => { onOpen(); }}>
          Add mentee
        </Button>
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
        <Flex width={colWidth[1]}>Mentor</Flex>
        <Flex width={colWidth[2]}>Email</Flex>
        <Flex width={colWidth[3]}>Phone number</Flex>
        <Flex width={colWidth[4]}>Class</Flex>
        <Flex width={colWidth[5]}>Joined At</Flex>
      </Flex>
      <AddMenteeModal isOpen={isOpen} onClose={() => { increaseSubmit(); onClose(); }} />

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
              <Flex width={colWidth[0]}>
                {mentee.mentorId && <InternalLink href={`/user/${mentee.mentorId}`}>
                  {mentee.mentorName}
                </InternalLink>}
                {!mentee.mentorId && <Button colorScheme={"primary"} onClick={() => {
                  setMenteeId(mentee.userId);
                  setMenteeName(mentee.firstName + " " + mentee.lastName);
                  console.log("menteeId = ", mentee.userId);
                  console.log("mentee--------- = ", mentee.firstName + " " + mentee.lastName)
                  onAssignOpen();
                }}>Assign</Button>}
              </Flex>

              <Flex width={colWidth[1]}>{mentee.email}</Flex>
              <Flex width={colWidth[2]}>{mentee.phoneNumber}</Flex>
              <Flex width={colWidth[3]}>
                {mentee.class ? mentee.class : "--"}
              </Flex>
              <Flex width={colWidth[4]}>
                {mentee.joinedAt ? timestampToDate(mentee.joinedAt) : "--"}
              </Flex>
            </Flex>
          </>
        );
      })}

      <AssignModal isOpen={isAssignOpen} onClose={onAssignClose} menteeId={menteeId} menteeName={menteeName} />

    </Box>
  )
}

export default AdminMenteeTable;