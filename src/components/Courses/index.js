import { Box } from "@chakra-ui/react";
import { useAppSelector } from "src/app/hooks";
import { userSelector } from "src/store/user";
import MenteeCourseTable, {
  exampleMenteeCourses,
} from "./CourseTables/MenteeCourseTable";
import MentorCourseTable, {
  exampleMentorCourses,
} from "./CourseTables/MentorCourseTable";

const Courses = () => {
  const { role } = useAppSelector(userSelector);
  return (
    <Box width="calc(100vw-220px)" fontSize="3xl" ml={220} mt={5}>
      {role === "mentee" && (
        <MentorCourseTable courses={exampleMentorCourses} />
      )}
      {role === "mentee" && (
        <MenteeCourseTable courses={exampleMenteeCourses} />
      )}
    </Box>
  );
};

export default Courses;
