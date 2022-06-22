import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
} from "@chakra-ui/react";
import PrimaryButton from "../common/PrimaryButton";
import { TableHeadLayout, TableLayout } from "../common/TableLayouts";

const CreateCourse = () => {
  const BrowseTaskButton = () => {
    return <Button colorScheme={"primary"}>Browse Task</Button>;
  };
  const AddTask = () => {
    return <Button colorScheme={"primary"}>Add Task</Button>;
  };
  const TableHead = () => {
    return (
      <TableHeadLayout
        tableName={
          <Editable defaultValue="Course Name">
            <EditableInput />
            <EditablePreview />
          </Editable>
        }
        sideText={"0 tasks"}
      >
        <Flex flexDirection={"row"}>
          <PrimaryButton name={"Browse Task"} mr="10px" />
          <PrimaryButton name={"Add Task"} mr={"50px"} />
        </Flex>
      </TableHeadLayout>
    );
  };
  return (
    <Box width="calc(100vw-220px)" fontSize="3xl" ml={220} mt={5}>
      <TableLayout width="1200px">
        <TableHead />
      </TableLayout>
    </Box>
  );
};

export default CreateCourse;
