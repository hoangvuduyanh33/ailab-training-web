import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Editable,
  EditablePreview,
  EditableInput,
  Text,
  Flex,
  ModalFooter,
  Button,
  Input,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";
import { userApi } from "src/services";
interface AddMenteeModalProps {
  isOpen: boolean;
  onClose: any;
}

const AddMenteeModal = (props: AddMenteeModalProps) => {
  const { isOpen, onClose } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState(0);
  const [menteeClass, setMenteeClass] = useState("");

  const handleCreateMentor = () => {
    setStatus(1);
    try {
      userApi.createMentee({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        class: menteeClass,
      }).then((response: any) => {
        console.log("response = ", response)
        if (response) {
          setStatus(2);
        } else {
          setStatus(3);
        }
        setTimeout(
          () => {
            setStatus(0);
            onClose();
          },
          2000
        )
      }).catch(e => {
        setStatus(3);
        setTimeout(
          () => {
            setStatus(0);
            onClose();
          },
          2000
        )
      })
    } catch (e) {
      setStatus(3);
      setTimeout(
        () => {
          setStatus(0);
          onClose();
        },
        2000
      )
    }
  }

  console.log("status = ", status);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      closeOnEsc={false}
    >
      <ModalOverlay backdropFilter="blur(3px) !important;" />
      <ModalContent minW={"600px"}>
        <ModalHeader fontSize={"30px"}>Add mentee</ModalHeader>
        <ModalBody width={"full"}>
          {
            (status == 0) && <Flex flexDir={"column"}>
              <Flex flexDir="row">
                <Input placeholder="First name" borderRadius={"10px"} value={firstName} onChange={(e: any) => { setFirstName(e.target.value) }} />
                <Input placeholder="Last name" borderRadius={"10px"} ml={3} value={lastName} onChange={(e: any) => { setLastName(e.target.value) }} />
              </Flex>
              <Input placeholder="Email" mt={2} value={email} onChange={(e: any) => { setEmail(e.target.value) }} />
              <Input placeholder="Password" type={"password"} mt={2} value={password} onChange={(e: any) => { setPassword(e.target.value) }} />
              <Input placeholder="Phone number" mt={2} value={phoneNumber} onChange={(e: any) => { setPhoneNumber(e.target.value) }} />
              <Input placeholder="Class" mt={2} value={menteeClass} onChange={(e: any) => { setMenteeClass(e.target.value) }} />
            </Flex>
          }
          {
            (status == 1) && <Flex width="100%" flexDir={"column"} alignSelf={"center"}>
              <CircularProgress isIndeterminate color="primary.200" alignSelf={"center"} />
            </Flex>
          }
          {
            (status == 2) && <Text>Created account for mentor {firstName} {lastName} success </Text>
          }
          {
            (status == 3) && <Text>Created account for mentor {firstName} {lastName} success </Text>
          }
        </ModalBody>
        <ModalFooter>
          <Flex flexDir={"row"} mt={1}>
            <Button
              w="40"
              colorScheme={"gray"}
              mr={3}
              onClick={onClose}
              color="white"
            >
              Cancel
            </Button>
            <Button
              w="40"
              colorScheme={"primary"}
              onClick={() => {
                handleCreateMentor();
              }}
              color="white"
            >
              Confirm
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMenteeModal;
