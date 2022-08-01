import { Box, BoxProps, Flex, Image } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setUser, userSelector } from "src/store/user";
import UETLogo from "src/assets/uet-logo.jpg"

interface SidebarProps {
  isOpen: boolean;
  closedrawer?: () => void;
  onToggle: () => void;
}

const SidebarItem = (props: any) => {
  const { name, href, ...restProps } = props;
  return (
    <Link to={href}>
      <Flex
        _hover={{ color: "primary.200" }}
        pl={3}
        cursor="pointer"
        paddingTop={"10px"}
        paddingBottom={"10px"}
        paddingLeft="40px"
        {...restProps}
      >
        {" "}
        {name}{" "}
      </Flex>
    </Link>
  );
};

const MenteeSidebarItems = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <SidebarItem name="Home" href="/home" />
      <SidebarItem name="Tasks" href="tasks" />
      <SidebarItem
        name="Log out"
        href="/sign-in"
        onClick={() => {
          dispatch(setUser({
            userId: "",
            email: "",
            token: "",
          }));
        }}
      />
    </>
  );
};

const MentorSidebarItems = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <SidebarItem name="Home" href="/home" />
      <SidebarItem name="Tasks" href="/tasks" />
      <SidebarItem name="Mentees" href="/mentees" />
      <SidebarItem
        name="Log out"
        href="/sign-in"
        onClick={() => {
          dispatch(setUser({
            userId: "",
            email: "",
            token: "",
          }));
        }}
      />
    </>
  );
};

const AdminSidebarItems = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <SidebarItem name="Home" href="/home" />
      <SidebarItem name="Mentees" href="/mentees" />
      <SidebarItem name="Mentors" href="/mentors" />
      <SidebarItem
        name="Log out"
        href="/sign-in"
        onClick={() => {
          dispatch(setUser({
            userId: "",
            email: "",
            token: "",
          }));
        }}
      />
    </>
  );
};

const Sidebar = (props: SidebarProps & BoxProps) => {
  const { role } = useAppSelector(userSelector);
  const { isOpen, onToggle, ...restProps } = props;

  console.log("role = ", role);

  return (
    <Box
      {...restProps}
      w={isOpen ? "220px" : "64px"}
      bg="gray.700"
      minH="100vh"
      pos="fixed"
      transition="0.3s"
      zIndex="100"
      // overflow="auto"
      fontSize={20}
    >
      <Flex
        flexDirection="row"
        width="full"
        fontSize="22px"
        alignItems={"center"}
        mt={2}
        ml={2}
        cursor="pointer"
        mb={2}
      >
        <Image src={UETLogo} boxSize={8} borderRadius="full" />
        <Flex ml={2}>Ailab Training</Flex>
      </Flex>
      {role === "mentee" && <MenteeSidebarItems />}
      {role === "mentor" && <MentorSidebarItems />}
      {role === "admin" && <AdminSidebarItems />}
    </Box>
  );
};

export default Sidebar;
