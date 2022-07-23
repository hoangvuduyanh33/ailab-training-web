import { Divider, Flex } from "@chakra-ui/react";
import { TableHeadLayout, TableLayout } from "../common/TableLayouts";
import {
  MentorTaskHeadRow,
  MentorTaskRow,
} from "../Tasks/TaskTables/MentorTaskTable";

export interface MentorSingleCourseProps {
  courseName: string;
}
const MentorSingleCourse = (props: MentorSingleCourseProps) => {
  const { courseName } = props;
  return (
    <TableLayout width="1300px" mt={10}>
      <Divider />
      <MentorTaskHeadRow />
      <Divider />
    </TableLayout>
  );
};

export default MentorSingleCourse;
