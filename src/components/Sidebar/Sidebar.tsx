import { Box, BoxProps, Flex, Image } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { setEmail, setRole, userSelector } from "src/store/user";

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
  const dispatch = useDispatch();
  return (
    <>
      <SidebarItem name="Home" href="/" />
      <SidebarItem name="Courses" href="/courses" />
      <SidebarItem name="Tasks" href="tasks" />
      <SidebarItem
        name="Log out"
        href="/sign-in"
        onClick={() => {
          dispatch(setRole(""));
          dispatch(setEmail(""));
        }}
      />
    </>
  );
};

const MentorSidebarItems = () => {
  return (
    <>
      <SidebarItem name="Home" to={``} />
      <SidebarItem name="Courses" to={`/courses`} />
      <SidebarItem name="Tasks" to={`/tasks`} />
      <SidebarItem name="Mentees" to={`/mentees`} />
      <SidebarItem name="Log out" />
    </>
  );
};

const AdminSidebarItems = () => {
  return (
    <>
      <SidebarItem name="Home" />
      <SidebarItem name="Mentors" />
      <SidebarItem name="Mentees" />
      <SidebarItem name="Courses" />
      <SidebarItem name="Tasks" />
      <SidebarItem name="Log out" />
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
        <Image src="./uet-logo.jpg" boxSize={8} borderRadius="full" />
        <Flex ml={2}>Ailab Training</Flex>
      </Flex>
      {role === "mentee" && <MenteeSidebarItems />}
      {role === "mentor" && <MentorSidebarItems />}
      {role === "admin" && <AdminSidebarItems />}
    </Box>
  );
};

export default Sidebar;
