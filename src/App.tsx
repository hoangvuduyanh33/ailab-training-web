import React, { lazy } from "react";
import "./App.css";
import { Flex, Box } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import SingleCourse from "./components/SingleCourse";
import SingleTask from "./components/SingleTask";
import SingleQuestion from "./components/SingleQuestion/SingleQuestion";
import Summary from "./components/Summary";
import Courses from "./components/Courses";
import CreateCourse from "./components/Courses/CreateCourse";
import Tasks from "./components/Tasks";

const App: React.FC = () => {
  return (
    <>
      <Flex>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Layout />}>
              <Route index element={<Summary />} />
              <Route path="/courses">
                <Route index element={<Courses />} />
                <Route path=":courseid" element={<SingleCourse />} />
              </Route>
              <Route path="/tasks">
                <Route index element={<Tasks />} />
                <Route path=":taskid" element={<SingleTask />} />
              </Route>
              <Route path="/question" element={<SingleQuestion />} />
              <Route path="/create-course" element={<CreateCourse />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
};

export default App;
