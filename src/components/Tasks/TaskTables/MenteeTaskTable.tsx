import { Divider, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  TableHeadLayout,
  TableHeadRowLayout,
  TableLayout,
} from "src/components/common/TableLayouts";
import { useTasks } from "src/hooks/useTasks";
import AddTaskModal from "./AddTaskModal";

const colWidth = ["30%", "12%", "12%", "12%", "12%", "12%", "10%"];
export const MentorTaskHeadRow = () => {
  return (
    <TableHeadRowLayout>
      <Flex paddingLeft={"60px"} width={colWidth[0]}>
        Name
      </Flex>
      <Flex width={colWidth[1]}>No. Mentees</Flex>
      <Flex width={colWidth[2]}>Pending</Flex>
      <Flex width={colWidth[3]}>Finished</Flex>
      <Flex width={colWidth[4]}>Finished Rate</Flex>
      <Flex width={colWidth[5]}>Avg</Flex>
      <Flex width={colWidth[6]}>Tag</Flex>
    </TableHeadRowLayout>
  );
};

export const MentorTaskRow = ({
  task,
  ...props
}: {
  task: any;
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
        width={colWidth[0]}
        overflow={"hidden"}
        paddingRight="50px"
        cursor={"pointer"}
        _hover={{ color: "primary.200" }}
        onClick={() => {
          navigate(`${task.taskId}`);
        }}
      >
        {task.name}
      </Flex>
      <Flex width={colWidth[1]} cursor="pointer" _hover={{ color: "primary.200" }}>
        {task.numMentees}
      </Flex>
      <Flex width={colWidth[2]}>{task.numPending}</Flex>
      <Flex width={colWidth[3]} cursor="pointer" _hover={{ color: "primary.200" }}>
        {task.numFinished}
      </Flex>

      <Flex width={colWidth[4]}>
        {((task.numFinished / task.numMentees) * 100).toFixed(2)}%
      </Flex>
      <Flex width={colWidth[5]}>{task.avgScore}</Flex>
      <Flex width={colWidth[6]}>
        {(task.tags && task.tags.length > 0) ? task.tags[0] : ""}
      </Flex>
    </Flex>
  );
};

const MenteeTaskTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, isLoading] = useTasks({});
  console.log("tasks = ", tasks);
  const TableHead = () => {
    return (
      <>
        <TableHeadLayout tableName={"Tasks"} sideText={`${tasks.length} tasks`}>
          <></>
        </TableHeadLayout>
      </>
    );
  };

  return (
    <TableLayout width="1300px" mt={10}>
      <TableHead />
      <Divider />
      <MentorTaskHeadRow />
      <Divider />
      {tasks.map((task: any) => {
        return <MentorTaskRow task={task} />;
      })}
    </TableLayout>
  );
};
export default MenteeTaskTable;
