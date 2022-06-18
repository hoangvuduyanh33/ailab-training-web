import { Box } from "@chakra-ui/react";
import { useAppSelector } from "src/app/hooks";
import { userSelector } from "src/store/user";
import MenteeTaskTable, {exampleMenteeTasks} from "./TaskTables/MenteeTaskTable";


const Tasks = () => {
  const { role } = useAppSelector(userSelector);
  return (
    <Box width="calc(100vw-220px)" fontSize="3xl" ml={220} mt={5}>
      {role === "mentee" &&  <MenteeTaskTable tasks={exampleMenteeTasks} />} 
      {role === "mentor" && <MenteeTaskTable tasks={exampleMenteeTasks} /> }  
    </Box>
  )
}

export default Tasks;