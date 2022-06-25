import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ModalLayout from "../common/ModalLayout";
import PrimaryButton from "../common/PrimaryButton";
import { TableHeadLayout, TableLayout } from "../common/TableLayouts";
import AddTaskModal from "../Tasks/TaskTables/AddTaskModal";
import {
  exampleMentorTasks,
  MentorTaskHeadRow,
  MentorTaskProps,
  MentorTaskRow,
} from "../Tasks/TaskTables/MentorTaskTable";

interface BrowseTaskModalProps {
  isOpen: boolean;
  onAddTask: (task: MentorTaskProps) => void;
  onClose: any;
}

const BrowseTaskModal = (props: BrowseTaskModalProps) => {
  const { isOpen, onClose, onAddTask } = props;
  return (
    <>
      <ModalLayout isOpen={isOpen} onClose={onClose} minW="1200px">
        <ModalBody>
          <TableLayout>
            <TableHeadLayout tableName={"All tasks"} sideText={"4 tasks"}>
              <></>
            </TableHeadLayout>
            <MentorTaskHeadRow />
            {exampleMentorTasks.map((task) => {
              return (
                <MentorTaskRow
                  task={task}
                  onClick={() => {
                    onAddTask(task);
                    onClose();
                  }}
                />
              );
            })}
          </TableLayout>
        </ModalBody>
      </ModalLayout>
    </>
  );
};

const CreateCourse = () => {
  const {
    isOpen: isBrowseModalOpen,
    onClose: onCloseBrowseModal,
    onOpen: onOpenBrowseModal,
  } = useDisclosure();
  const {
    isOpen: isAddTaskModalOpen,
    onClose: onCloseAddTaskModal,
    onOpen: onOpenAddTaskModal,
  } = useDisclosure();
  const [tasks, setTasks] = useState<MentorTaskProps[]>([]);

  const handleAddTask = (task: MentorTaskProps) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const [courseName, setCourseName] = useState("");

  const handleChangeName = (e: any) => {
    setCourseName(e.currentTarget.value);
  };

  return (
    <Box width="calc(100vw-220px)" fontSize="3xl" ml={220} mt={5}>
      <TableLayout width="1200px">
        <Flex
          flexDir="row"
          alignItems={"center"}
          width="100%"
          height="80px"
          _hover={{ bgColor: "gray.800", borderTopRadius: "16px" }}
        >
          <Flex fontSize={"30px"} ml={"50px"}>
            <Editable defaultValue="Course Name">
              <EditablePreview />
              <EditableInput value={courseName} onChange={handleChangeName} />
            </Editable>
          </Flex>
          <Flex fontSize="16px" color={"whiteAlpha.500"} ml={5}>
            {`${tasks.length} tasks`}
          </Flex>
          <Spacer />
          <Flex flexDirection={"row"}>
            <PrimaryButton
              name={"Browse Task"}
              mr="10px"
              onClick={onOpenBrowseModal}
            />
            <PrimaryButton
              name={"Add Task"}
              mr={"50px"}
              onClick={onOpenAddTaskModal}
            />
          </Flex>
        </Flex>
        <MentorTaskHeadRow />
        {tasks.map((task) => {
          return <MentorTaskRow task={task} />;
        })}
      </TableLayout>
      <BrowseTaskModal
        isOpen={isBrowseModalOpen}
        onClose={onCloseBrowseModal}
        onAddTask={handleAddTask}
      />
      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={onCloseAddTaskModal} />
    </Box>
  );
};

export default CreateCourse;
