import { Box, BoxProps, Flex, Image } from "@chakra-ui/react";

interface SidebarProps {
  isOpen: boolean;
  closedrawer?: () => void;
  onToggle: () => void;
}

const Sidebar = (props: SidebarProps & BoxProps) => {
  const { isOpen, onToggle, ...restProps } = props;

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
    >
      <Flex
        flexDirection="row"
        width="full"
        fontSize="22px"
        alignItems={"center"}
        mt={2}
        ml={2}
        cursor="pointer"
      >
        <Image src="./uet-logo.jpg" boxSize={8} borderRadius="full" />
        <Flex ml={2}>Ailab Training</Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
