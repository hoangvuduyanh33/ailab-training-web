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
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useTasks } from "src/hooks/useTasks";
import { setTabIndex, tasksSelector } from "src/store/tasks";
import { userSelector } from "src/store/user";
import PageLayout from "../common/PageLayout";
import MentorMenteeTable from "../Mentees/MentorMenteeTable";
import MentorAddMentees from "./MentorAddMentees";
import Questions from "./Questions/Questions";
import { MenteeSubmissionsTable } from "./Submissions/MenteeSubmissions";
import { MentorSubmissionsTable } from "./Submissions/MentorSubmissions";

export interface SingleTaskProps {
  name: string;
  content: string;
}

const SingleTask = () => {
  const { taskId } = useParams();
  const { role } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { tabIndex } = useAppSelector(tasksSelector);
  const [task, isLoading] = useTasks({ taskId: taskId })
  console.log("task = ", task)
  return (
    <PageLayout>
      <Flex ml={"5vw"}>
        <Flex flexDir={"column"}>
          <Flex>
            <Text fontSize={"3xl"}>{task.name}</Text>
          </Flex>
          <Tabs
            mt={6}
            onChange={(index: any) => dispatch(setTabIndex(index))}
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
              {
                (role == "mentor") &&
                <Tab
                  _selected={{
                    color: "primary.200",
                  }}
                >
                  Mentees
                </Tab>
              }
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
                <Flex maxWidth={"1000px"}>
                  <MDEditor.Markdown source={task.content} />
                </Flex>
              </TabPanel>
              <TabPanel>
                {
                  (role == "mentor") && <MentorSubmissionsTable />
                }
                {
                  (role == "mentee") && <MenteeSubmissionsTable />
                }
              </TabPanel>

              {
                (role == "mentor") &&
                <TabPanel>
                  <MentorAddMentees />
                </TabPanel>
              }
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
