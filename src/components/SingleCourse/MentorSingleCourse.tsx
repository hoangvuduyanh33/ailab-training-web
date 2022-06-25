import { Divider, Flex } from "@chakra-ui/react";
import { TableHeadLayout, TableLayout } from "../common/TableLayouts";
import {
  MentorTaskHeadRow,
  MentorTaskProps,
  MentorTaskRow,
} from "../Tasks/TaskTables/MentorTaskTable";

export interface MentorSingleCourseProps {
  courseName: string;
  tasks: MentorTaskProps[];
}
const MentorSingleCourse = (props: MentorSingleCourseProps) => {
  const { courseName, tasks } = props;
  const TableHead = () => {
    return (
      <>
        <TableHeadLayout
          tableName={courseName}
          sideText={`${tasks.length} tasks`}
        >
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
      {tasks.map((task: MentorTaskProps) => {
        return <MentorTaskRow task={task} />;
      })}
    </TableLayout>
  );
};

export default MentorSingleCourse;
