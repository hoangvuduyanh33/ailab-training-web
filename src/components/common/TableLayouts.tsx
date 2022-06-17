import { Box, Flex, Spacer } from "@chakra-ui/react";

export const TableLayout = (props: any) => {
  const { width, children, ...restProps } = props;
  return (
    <Box width={width} {...restProps} bgColor={"gray.700"} borderRadius="16px">
      <Flex width={"full"} flexDirection="column" fontSize={"16px"}>
        {children}
      </Flex>
    </Box>
  );
};

export const TableHeadLayout = ({
  tableName,
  sideText,
  children,
}: {
  tableName: string;
  sideText: string;
  children: any;
}) => {
  return (
    <Flex
      flexDir="row"
      alignItems={"center"}
      width="100%"
      height="80px"
      _hover={{ bgColor: "gray.800" }}
    >
      <Flex fontSize={"30px"} ml={"50px"}>
        {tableName}
      </Flex>
      <Flex fontSize="16px" color={"whiteAlpha.500"} ml={5}>
        {sideText}
      </Flex>
      <Spacer />
      {children}
    </Flex>
  );
};

export const TableHeadRowLayout = ({ children }: { children: any }) => {
  return (
    <Flex
      flexDir="row"
      alignItems={"center"}
      width="100%"
      height="80px"
      color={"whiteAlpha.500"}
      _hover={{ bgColor: "gray.800" }}
    >
      {children}
    </Flex>
  );
};
