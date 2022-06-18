import { Divider, Flex, Spacer } from "@chakra-ui/react";
import {
  TableHeadLayout,
  TableHeadRowLayout,
  TableLayout,
} from "src/components/common/TableLayouts";
import { timestampToDate } from "src/components/utils/time";

export interface MenteeCourseProps {
  name: string;
  courseId?: string;
  mentorName?: string;
  mentorUsername?: string;
  status: string;
  avg: number;
  finishedTasks: number;
  totalTasks: number;
  joinedDate?: number;
  finishedDate?: number;
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
    joinedDate: Date.now(),
    finishedDate: Date.now(),
  },
  {
    name: "Courses 2",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Aborted",
    avg: 5.3,
    finishedTasks: 10,
    totalTasks: 15,
    joinedDate: Date.now(),
    finishedDate: Date.now(),
  },
  {
    name: "Courses 2",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Finished",
    avg: 8.0,
    finishedTasks: 10,
    totalTasks: 15,
    joinedDate: Date.now(),
    finishedDate: Date.now(),
  },
  {
    name: "Courses 2",
    mentorName: "Nguyen Dinh Tuan",
    mentorUsername: "ndtuan",
    status: "Closed",
    avg: 8.0,
    finishedTasks: 10,
    totalTasks: 15,
    joinedDate: Date.now(),
    finishedDate: Date.now(),
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
        width="30%"
        overflow={"hidden"}
        paddingRight="50px"
        cursor={"pointer"}
        _hover={{ color: "primary.200" }}
      >
        {course.name}
      </Flex>
      <Flex width={"15%"} cursor="pointer" _hover={{ color: "primary.200" }}>
        {course.mentorName}
      </Flex>
      <Flex width={"8%"} _hover={{ color: statusColor(course.status) }}>
        {course.status}
      </Flex>
      <Flex width={"5%"}>{course.avg}</Flex>
      <Flex width={"6%"}>
        {((course.finishedTasks / course.totalTasks) * 100).toFixed(2)}
        {"%"}
      </Flex>
      <Flex width={"6%"}>
        {course.finishedTasks} / {course.totalTasks}
      </Flex>
      <Flex width={"15%"}>
        {course.joinedDate ? timestampToDate(course.joinedDate) : ""}
      </Flex>
      <Flex width={"15%"}>
        {course.finishedDate ? timestampToDate(course.finishedDate) : ""}
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
        <Flex paddingLeft={"60px"} width="30%">
          Name
        </Flex>
        <Flex width={"15%"}>Mentor</Flex>
        <Flex width={"8%"}>Status</Flex>
        <Flex width={"5%"}>Avg</Flex>
        <Flex width={"6%"}>Progress</Flex>
        <Flex width={"6%"}>FT/TT</Flex>
        <Flex width={"15%"}>Joined</Flex>
        <Flex width={"15%"}>Finished</Flex>
      </TableHeadRowLayout>
    );
  };

  return (
    <TableLayout width="1500px" mt={10}>
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
