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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
interface AddTaskModalProps {
  isOpen: boolean;
  onClose: any;
}

const AddTaskModal = (props: AddTaskModalProps) => {
  const { isOpen, onClose } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {}, []);
  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      closeOnEsc={false}
    >
      <ModalOverlay backdropFilter="blur(3px) !important;" />
      <ModalContent minW={"900px"}>
        <ModalHeader fontSize={"30px"}>Add task</ModalHeader>
        <ModalBody width={"full"}>
          <Editable defaultValue="New Task Title" fontSize={"20px"}>
            <EditablePreview>
              <Text>Something</Text>
            </EditablePreview>
            <EditableInput
              value={title}
              onChange={handleChangeTitle}
              fontSize="20px"
            />
          </Editable>
          <Flex height={"300px"} mt={7}>
            <MDEditor
              height={300}
              value={content}
              style={{ width: "100%", color: "white" }}
              onChange={(value) => {
                setContent(value!);
              }}
            />
          </Flex>
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
              onClick={onClose}
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

export default AddTaskModal;
