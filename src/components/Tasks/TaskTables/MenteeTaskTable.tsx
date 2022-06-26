import { Divider, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  TableHeadLayout,
  TableHeadRowLayout,
  TableLayout,
} from "src/components/common/TableLayouts";
import { timestampToDate } from "src/components/utils/time";

export interface MenteeTaskProps {
  name: string;
  id?: string;
  taskId?: string;
  mentorName?: string;
  mentorUsername?: string;
  status: string;
  avg: number;
  joinedDate?: number;
  finishedDate?: number;
}

export interface MenteeTaskTableProps {
  tasks: MenteeTaskProps[];
}

export const exampleMenteeTasks: MenteeTaskProps[] = [
  {
    name: "Tasks 1 Tasks 1 Tasks 1 Tasks 1 Tasks 1 Tasks 1 Tasks 1 ",
    id: "1",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Open",
    avg: 8.9,
    joinedDate: Date.now(),
    finishedDate: Date.now(),
  },
  {
    name: "Tasks 2",
    mentorName: "Nguyen Dinh Tuan",
    id: "2",
    mentorUsername: "ndtuan",
    status: "Aborted",
    avg: 5.3,
    joinedDate: Date.now(),
    finishedDate: Date.now(),
  },
  {
    name: "Tasks 3",
    id: "3",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Finished",
    avg: 8.0,
    joinedDate: Date.now(),
    finishedDate: Date.now(),
  },
  {
    name: "Tasks 4",
    id: "4",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Closed",
    avg: 8.0,
    joinedDate: Date.now(),
    finishedDate: Date.now(),
  },
];

const TableRow = ({ task }: { task: MenteeTaskProps }) => {
  const navigate = useNavigate();
  const statusColor = (status: string) => {
    if (status === "Open") {
      return "primary.200";
    }
    if (status === "Aborted") {
      return "red";
    }
    if (status === "Finished") {
      return "green";
    }
    if (status === "Closed") {
      return "red";
    }
    return "white";
  };
  return (
    <Flex
      flexDir="row"
      alignItems={"center"}
      width="100%"
      height="80px"
      color={"whiteAlpha.500"}
      _hover={{ bgColor: "gray.800" }}
    >
      <Flex
        paddingLeft={"60px"}
        width="30%"
        overflow={"hidden"}
        paddingRight="50px"
        cursor={"pointer"}
        _hover={{ color: "primary.200" }}
        onClick={() => {
          navigate(`/tasks/${task.id}`);
        }}
      >
        {task.name}
      </Flex>
      <Flex width={"15%"} cursor="pointer" _hover={{ color: "primary.200" }}>
        {task.mentorName}
      </Flex>
      <Flex width={"15%"} _hover={{ color: statusColor(task.status) }}>
        {task.status}
      </Flex>
      <Flex width={"10%"}>{task.avg}</Flex>
      <Flex width={"15%"}>
        {task.joinedDate ? timestampToDate(task.joinedDate) : ""}
      </Flex>
      <Flex width={"15%"}>
        {task.finishedDate ? timestampToDate(task.finishedDate) : ""}
      </Flex>
    </Flex>
  );
};

const MenteeTaskTable = (props: MenteeTaskTableProps) => {
  const { tasks } = props;
  console.log("tasks = ", tasks);
  const TableHead = () => {
    return (
      <TableHeadLayout tableName="Tasks" sideText={`${tasks.length} tasks`}>
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
        >
          Browse tasks
        </Flex>
      </TableHeadLayout>
    );
  };
  const TableHeadRow = () => {
    return (
      <TableHeadRowLayout>
        <Flex paddingLeft={"60px"} width="30%">
          Name
        </Flex>
        <Flex width={"15%"}>Mentor</Flex>
        <Flex width={"15%"}>Status</Flex>
        <Flex width={"10%"}>Avg</Flex>
        <Flex width={"15%"}>Joined</Flex>
        <Flex width={"15%"}>Finished</Flex>
      </TableHeadRowLayout>
    );
  };

  return (
    <TableLayout width="1300px" mt={10}>
      <TableHead />
      <Divider />
      <TableHeadRow />
      <Divider />
      {tasks.map((task) => {
        return <TableRow task={task} />;
      })}
    </TableLayout>
  );
};
export default MenteeTaskTable;
