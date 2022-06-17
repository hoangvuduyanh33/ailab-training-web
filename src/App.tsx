import React, { lazy } from "react";
import "./App.css";
import { Flex, Box } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";

const Summary = lazy(() => import("src/components/Summary"));

const App: React.FC = () => {
  return (
    <>
      <Flex>
        <Sidebar onToggle={() => {}} isOpen={true} />
        <Box flex="1" minW="0" ml={"220px"}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Summary />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Flex>
    </>
  );
};

export default App;
