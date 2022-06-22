import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <Box width={"full"} height="auto">
      <Sidebar isOpen={true} onToggle={() => {}} />
      <Box flex={"1"} minW="0" pl="100px">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
