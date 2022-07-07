import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface InternalLinkProps {
  children: any;
  href: string;
  [restProps: string]: any;
}

export const InternalLink = (props: InternalLinkProps) => {
  const { children, href, ...restProps } = props;
  const navigate = useNavigate();
  return <Flex
    _hover={{
      color: "primary.200"
    }}
    cursor="pointer"
    onClick={() => {
      navigate(href);
    }}
    {...restProps}
  >
    {children}
  </Flex>
}
