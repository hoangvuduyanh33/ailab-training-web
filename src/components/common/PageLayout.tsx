import { Box } from "@chakra-ui/react";

const PageLayout = (props: any) => {
  const { children } = props;
  return (
    <Box width="calc(100vw-220px)" fontSize="3xl" ml={220} mt={5}>
      {children}
    </Box>
  );
};

export default PageLayout;
