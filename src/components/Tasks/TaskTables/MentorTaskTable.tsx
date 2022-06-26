import { Divider, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableHeadLayout,
  TableHeadRowLayout,
  TableLayout,
} from "src/components/common/TableLayouts";
import { timestampToDate } from "src/components/utils/time";
import AddTaskModal from "./AddTaskModal";

export interface MentorTaskProps {
  name: string;
  id?: string;
  numberAttend: number;
  numberFinished: number;
  status: string;
  avg: number;
  createdDate?: number;
}

export interface MentorTaskTableProps {
  tasks: MentorTaskProps[];
}

export const MentorTaskHeadRow = () => {
  return (
    <TableHeadRowLayout>
      <Flex paddingLeft={"60px"} width="30%">
        Name
      </Flex>
      <Flex width={"10%"}>Assigned</Flex>
      <Flex width={"10%"}>Finished</Flex>
      <Flex width={"10%"}>Finished rate</Flex>
      <Flex width={"10%"}>Status</Flex>
      <Flex width={"10%"}>Avg</Flex>
      <Flex width={"15%"}>Created Date</Flex>
    </TableHeadRowLayout>
  );
};

export const MentorTaskRow = ({
  task,
  ...props
}: {
  task: MentorTaskProps;
  [restProps: string]: any;
}) => {
  const navigate = useNavigate();
  return (
    <Flex
      flexDir="row"
      alignItems={"center"}
      width="100%"
      height="80px"
      color={"whiteAlpha.500"}
      _hover={{ bgColor: "gray.800" }}
      {...props}
    >
      <Flex
        paddingLeft={"60px"}
        width="30%"
        overflow={"hidden"}
        paddingRight="50px"
        cursor={"pointer"}
        _hover={{ color: "primary.200" }}
        onClick={() => {
          navigate(`${task.id}`);
        }}
      >
        {task.name}
      </Flex>
      <Flex width={"10%"} cursor="pointer" _hover={{ color: "primary.200" }}>
        {task.numberAttend}
      </Flex>
      <Flex width={"10%"}>{task.numberFinished}</Flex>
      <Flex width={"10%"}>
        {((task.numberFinished / task.numberAttend) * 100).toFixed(2)}
      </Flex>
      <Flex width={"10%"}>{task.status}</Flex>
      <Flex width={"10%"}>{task.avg}</Flex>
      <Flex width={"15%"}>
        {task.createdDate ? timestampToDate(task.createdDate) : ""}
      </Flex>
    </Flex>
  );
};

export const exampleMentorTasks: MentorTaskProps[] = [
  {
    name: "Tasks 1 Tasks 1 Tasks 1 Tasks 1 Tasks 1 Tasks 1 Tasks 1 ",
    id: "1",
    numberAttend: 200,
    numberFinished: 100,
    status: "Open",
    avg: 8.9,
    createdDate: Date.now(),
  },
  {
    name: "Tasks 2",
    id: "2",
    numberAttend: 200,
    numberFinished: 100,
    status: "Closed",
    avg: 5.3,
    createdDate: Date.now(),
  },
  {
    name: "Tasks 3",
    id: "3",
    numberAttend: 200,
    numberFinished: 100,
    status: "Closed",
    avg: 8.0,
    createdDate: Date.now(),
  },
  {
    name: "Tasks 4",
    id: "4",
    numberAttend: 200,
    numberFinished: 100,
    status: "Closed",
    avg: 8.0,
    createdDate: Date.now(),
  },
];

const MentorTaskTable = (props: MentorTaskTableProps) => {
  const { tasks } = props;
  console.log("tasks = ", tasks);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const TableHead = () => {
    return (
      <>
        <TableHeadLayout tableName={"Tasks"} sideText={`${tasks.length} tasks`}>
          <Flex
            bgColor={"primary.400"}
            mr="50px"
            padding="10px"
            borderRadius={"15px"}
            cursor="pointer"
            transition={"0.5s"}
            _hover={{
              bgColor: "primary.200",
            }}
            onClick={onOpen}
          >
            Add task
          </Flex>
        </TableHeadLayout>
        <AddTaskModal onClose={onClose} isOpen={isOpen} />
      </>
    );
  };

  return (
    <TableLayout width="1300px" mt={10}>
      <TableHead />
      <Divider />
      <MentorTaskHeadRow />
      <Divider />
      {tasks.map((task: MentorTaskProps) => {
        return <MentorTaskRow task={task} />;
      })}
    </TableLayout>
  );
};
export default MentorTaskTable;
