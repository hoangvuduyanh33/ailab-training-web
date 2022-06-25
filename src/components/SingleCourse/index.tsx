import { useAppSelector } from "src/app/hooks";
import { userSelector } from "src/store/user";
import PageLayout from "../common/PageLayout";
import { TableHeadLayout } from "../common/TableLayouts";
import { exampleMentorTasks } from "../Tasks/TaskTables/MentorTaskTable";
import MenteeSingleCourse from "./MenteeSingleCourse";
import MentorSingleCourse from "./MentorSingleCourse";

interface SingleCourseProps {
  courseName: string;
}

const SingleCourse = () => {
  const { role } = useAppSelector(userSelector);
  return (
    <PageLayout>
      {role === "mentee" && (
        <MentorSingleCourse
          courseName="Sample Course"
          tasks={exampleMentorTasks}
        />
      )}
    </PageLayout>
  );
};

export default SingleCourse;
