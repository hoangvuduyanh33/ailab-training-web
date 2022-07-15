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
import { SignIn } from "./components/AuthScreens/SignIn";
import { SignUp } from "./components/AuthScreens/SignUp";
import Mentors from "./components/Mentors";
import Mentees from "./components/Mentees";

const App: React.FC = () => {
  return (
    <>
      <Flex>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Summary />} />
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
              <Route path="/mentees" element={<Mentees />} />
              <Route path="/mentors" element={<Mentors />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
};

export default App;
