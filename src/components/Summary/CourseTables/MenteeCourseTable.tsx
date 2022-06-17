import { Divider, Flex, Spacer } from "@chakra-ui/react";
import {
  TableHeadLayout,
  TableHeadRowLayout,
  TableLayout,
} from "src/components/common/TableLayouts";

export interface MenteeCourseProps {
  name: string;
  courseId?: string;
  mentorName?: string;
  mentorUsername?: string;
  status: string;
  avg: number;
  finishedTasks: number;
  totalTasks: number;
}

export interface MenteeCourseTableProps {
  courses: MenteeCourseProps[];
}

export const exampleMenteeCourses: MenteeCourseProps[] = [
  {
    name: "Courses 1 Courses 1 Courses 1 Courses 1 Courses 1 Courses 1 Courses 1 ",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Open",
    avg: 8.9,
    finishedTasks: 10,
    totalTasks: 15,
  },
  {
    name: "Courses 2",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Aborted",
    avg: 5.3,
    finishedTasks: 10,
    totalTasks: 15,
  },
  {
    name: "Courses 2",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Finished",
    avg: 8.0,
    finishedTasks: 10,
    totalTasks: 15,
  },
  {
    name: "Courses 2",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Closed",
    avg: 8.0,
    finishedTasks: 10,
    totalTasks: 15,
  },
];

const TableRow = ({ course }: { course: MenteeCourseProps }) => {
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
        width="40%"
        overflow={"hidden"}
        paddingRight="50px"
        cursor={"pointer"}
        _hover={{ color: "primary.200" }}
      >
        {course.name}
      </Flex>
      <Flex width={"20%"} cursor="pointer" _hover={{ color: "primary.200" }}>
        {course.mentorName}
      </Flex>
      <Flex width={"10%"} _hover={{ color: statusColor(course.status) }}>
        {course.status}
      </Flex>
      <Flex width={"10%"}>{course.avg}</Flex>
      <Flex width={"10%"}>
        {((course.finishedTasks / course.totalTasks) * 100).toFixed(2)}
        {"%"}
      </Flex>
      <Flex width={"10%"}>
        {course.finishedTasks} / {course.totalTasks}
      </Flex>
    </Flex>
  );
};

const MenteeCourseTable = (props: MenteeCourseTableProps) => {
  const { courses } = props;
  console.log("courses = ", courses);
  const TableHead = () => {
    return (
      <TableHeadLayout
        tableName="Courses"
        sideText={`${courses.length} courses`}
      >
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
          Join courses
        </Flex>
      </TableHeadLayout>
    );
  };
  const TableHeadRow = () => {
    return (
      <TableHeadRowLayout>
        <Flex paddingLeft={"60px"} width="40%">
          Name
        </Flex>
        <Flex width={"20%"}>Mentor</Flex>
        <Flex width={"10%"}>Status</Flex>
        <Flex width={"10%"}>Avg</Flex>
        <Flex width={"10%"}>Progress</Flex>
        <Flex width={"10%"}>FT/TT</Flex>
      </TableHeadRowLayout>
    );
  };

  return (
    <TableLayout width="1200px" mt={10}>
      <TableHead />
      <Divider />
      <TableHeadRow />
      <Divider />
      {courses.map((course) => {
        return <TableRow course={course} />;
      })}
    </TableLayout>
  );
};
export default MenteeCourseTable;
