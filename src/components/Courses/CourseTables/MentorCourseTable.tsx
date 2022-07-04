import { Divider, Flex, Spacer } from "@chakra-ui/react";
import {
  TableHeadLayout,
  TableHeadRowLayout,
  TableLayout,
} from "src/components/common/TableLayouts";

export interface MentorCourseProps {
  name: string;
  courseId?: string;
  numberTasks: number;
  numberAttend: number;
  numberFinished: number;
  finishedPercentage: number;
  avg: number;
  createdDate?: number;
}

export interface MentorCourseTableProps {
  courses: MentorCourseProps[];
}

export const exampleMentorCourses: MentorCourseProps[] = [
  {
    name: "Course 1",
    courseId: "course1",
    numberTasks: 15,
    numberAttend: 200,
    numberFinished: 20,
    finishedPercentage: 20,
    avg: 8,
    createdDate: Date.now(),
  },
  {
    name: "Course 1",
    courseId: "course1",
    numberTasks: 15,
    numberAttend: 200,
    numberFinished: 20,
    finishedPercentage: 20,
    avg: 8,
    createdDate: Date.now(),
  },
  {
    name: "Course 1",
    courseId: "course1",
    numberTasks: 15,
    numberAttend: 200,
    numberFinished: 20,
    finishedPercentage: 20,
    avg: 8,
    createdDate: Date.now(),
  },
  {
    name: "Course 1",
    courseId: "course1",
    numberTasks: 15,
    numberAttend: 200,
    numberFinished: 20,
    finishedPercentage: 20,
    avg: 8,
    createdDate: Date.now(),
  },
];

const TableHead = ({ sideText }: { sideText: string }) => {
  return (
    <TableHeadLayout tableName="Courses" sideText={sideText}>
      <Spacer />
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
        Create courses
      </Flex>
    </TableHeadLayout>
  );
};

const TableHeadRow = () => {
  return (
    <TableHeadRowLayout>
      <Flex paddingLeft={"60px"} width="50%">
        Name
      </Flex>
      <Flex width={"10%"}>No of Tasks</Flex>
      <Flex width={"10%"}>Mentees</Flex>
      <Flex width={"10%"}>Finished</Flex>
      <Flex width={"10%"}>Finished %</Flex>
      <Flex width={"10%"}>Avg</Flex>
    </TableHeadRowLayout>
  );
};

const TableRow = ({ course }: { course: MentorCourseProps }) => {
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
        width="50%"
        overflow={"hidden"}
        paddingRight="50px"
        cursor={"pointer"}
        _hover={{ color: "primary.200" }}
      >
        {course.name}
      </Flex>
      <Flex width={"10%"} cursor="pointer" _hover={{ color: "primary.200" }}>
        {course.numberTasks}
      </Flex>
      <Flex width={"10%"}>{course.numberAttend}</Flex>
      <Flex width={"10%"}>{course.numberFinished}</Flex>
      <Flex width={"10%"}>
        {((course.numberFinished / course.numberAttend) * 100).toFixed(2)}
        {"%"}
      </Flex>
      <Flex width={"10%"}>{course.avg}</Flex>
    </Flex>
  );
};

const MentorCourseTable = (props: MentorCourseTableProps) => {
  const { courses } = props;
  console.log("courses = ", courses);

  return (
    <TableLayout mt={7} width={"1200px"} margin="auto">
      <TableHead sideText={`${courses.length} courses`} />
      <Divider />
      <TableHeadRow />
      <Divider />
      {courses.map((course) => {
        return <TableRow course={course} />;
      })}
    </TableLayout>
  );
};
export default MentorCourseTable;
