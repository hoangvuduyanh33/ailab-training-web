import React, { lazy } from "react";
import "./App.css";
import { Flex, Box } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";

const Summary = lazy(() => import("src/components/Summary"));
const Courses = lazy(() => import("src/components/Courses"));
const Tasks = lazy(() => import("src/components/Tasks"));
const App: React.FC = () => {
  return (
    <>
      <Flex>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Layout />}>
              <Route path="/" element={<Summary />} />
              <Route path="courses" element={<Courses />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
};

export default App;
