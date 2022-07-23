import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useAppSelector } from "src/app/hooks";
import { userSelector } from "src/store/user";
import MenteeTaskTable from "./TaskTables/MenteeTaskTable";
import MentorTaskTable, {
} from "./TaskTables/MentorTaskTable";

const Tasks = () => {
  const { role } = useAppSelector(userSelector);
  return (
    <Box width="calc(100vw-220px)" fontSize="3xl" ml={220} mt={5}>
      {role === "mentee" && <MenteeTaskTable />}
      {role === "mentor" && <MentorTaskTable />}
    </Box>
  );
};

export default Tasks;
