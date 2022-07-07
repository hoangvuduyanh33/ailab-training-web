import { Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { userSelector } from "src/store/user";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const { username } = useAppSelector(userSelector);
  if (!username) {
    return <Navigate to="/sign-in" />
  }
  return (
    <Box width={"full"} height="auto">
      <Sidebar isOpen={true} onToggle={() => { }} />
      <Box flex={"1"} minW="0" pl="100px">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
