import { Flex } from "@chakra-ui/react";

const PrimaryButton = (props: any) => {
  const { onClick, name, ...restProps } = props;
  return (
    <Flex
      bgColor={"primary.400"}
      padding="10px"
      borderRadius={"15px"}
      cursor="pointer"
      transition={"0.5s"}
      _hover={{
        bgColor: "primary.200",
      }}
      onClick={onClick}
      {...restProps}
    >
      {name}
    </Flex>
  );
};

export default PrimaryButton;
