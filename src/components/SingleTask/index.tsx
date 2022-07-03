import {
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { fetchTask } from "src/services/services";
import { setTabIndex, tasksSelector } from "src/store/tasks";
import PageLayout from "../common/PageLayout";
import Questions from "./Questions/Questions";
import { MenteeSubmissionsTable } from "./Submissions/MenteeSubmissions";
import { MentorSubmissionsTable } from "./Submissions/MentorSubmissions";

export interface SingleTaskProps {
  name: string;
  content: string;
}

const SingleTask = () => {
  const [taskProps, setTaskProps] = useState({
    name: "",
    content: "",
  });
  const { tabIndex } = useAppSelector(tasksSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const data = fetchTask("", true);
    console.log("data = ", data);
    if (data) {
      setTaskProps(data);
    }
  }, []);
  console.log(taskProps.name, taskProps.content);
  return (
    <PageLayout>
      <Flex ml={"5vw"}>
        <Flex flexDir={"column"}>
          <Flex>
            <Text fontSize={"3xl"}>{taskProps.name}</Text>
          </Flex>
          <Tabs
            mt={6}
            onChange={(index) => dispatch(setTabIndex(index))}
            index={tabIndex}
          >
            <TabList color={"white"} borderColor="transparent">
              <Tab
                _selected={{
                  color: "primary.200",
                }}
              >
                Statement
              </Tab>
              <Tab
                _selected={{
                  color: "primary.200",
                }}
              >
                Submissions
              </Tab>
              <Tab
                _selected={{
                  color: "primary.200",
                }}
              >
                Questions
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0">
                <Flex maxWidth={"500px"}>
                  <MDEditor.Markdown source={taskProps.content} />
                </Flex>
              </TabPanel>
              <TabPanel>
                <MentorSubmissionsTable />
              </TabPanel>
              <TabPanel>
                <Questions />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default SingleTask;
