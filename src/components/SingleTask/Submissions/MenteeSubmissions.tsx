import { Box, Button, Divider, Flex, Spacer } from "@chakra-ui/react";
import PageLayout from "src/components/common/PageLayout";
import {
  TableHeadLayout,
  TableLayout,
} from "src/components/common/TableLayouts";
import { timestampToDate } from "src/components/utils/time";

interface MenteeSubmission {
  id: number;
  status: string; //pending, judged, aborted
  score: number;
  type: string; //pdf, link
  submittedAt: string;
}

const colWidth = ["20%", "20%", "20%", "20%", "20%"];
const exampleSubmisisons: MenteeSubmission[] = [
  {
    id: 10000001,
    status: "pending",
    score: 10,
    type: "PDF",
    submittedAt: timestampToDate(Date.now()),
  },
  {
    id: 10000002,
    status: "pending",
    score: 8,
    type: "PDF",
    submittedAt: timestampToDate(Date.now()),
  },
  {
    id: 10000003,
    status: "pending",
    score: 8,
    type: "PDF",
    submittedAt: timestampToDate(Date.now()),
  },
  {
    id: 10000004,
    status: "pending",
    score: 8,
    type: "PDF",
    submittedAt: timestampToDate(Date.now()),
  },
  {
    id: 10000005,
    status: "pending",
    score: 8,
    type: "PDF",
    submittedAt: timestampToDate(Date.now()),
  },
];
export const MenteeSubmissionsTable = () => {
  const submissions = exampleSubmisisons;
  return (
    <Box width="1200px" borderRadius="16px" bgColor={"gray.700"}>
      <Flex
        flexDir="row"
        alignSelf={"center"}
        alignItems={"center"}
        width="100%"
        height="80px"
        bgColor="gray.700"
        borderTopRadius="16px"
        _hover={{ bgColor: "gray.800" }}
        px="50px"
      >
        <Flex fontSize={"30px"}>My Submissions</Flex>
        <Flex fontSize="16px" color={"whiteAlpha.500"} ml={5}>
          10 Submission
        </Flex>
        <Spacer />
        <Button colorScheme="primary">Submit</Button>
      </Flex>
      <Divider />
      <Flex
        flexDir="row"
        alignItems={"center"}
        width="100%"
        height="80px"
        color={"whiteAlpha.500"}
        fontSize="md"
        _hover={{ bgColor: "gray.800" }}
        px="50px"
      >
        <Flex width={colWidth[0]}>Id</Flex>
        <Flex width={colWidth[1]}>Status</Flex>
        <Flex width={colWidth[2]}>Score</Flex>
        <Flex width={colWidth[3]}>Type</Flex>
        <Flex width={colWidth[4]}>Submitted At</Flex>
      </Flex>
      {submissions.map((submission) => {
        return (
          <>
            <Divider />
            <Flex
              flexDir="row"
              alignItems={"center"}
              width="100%"
              height="80px"
              color={"whiteAlpha.500"}
              fontSize="md"
              _hover={{ bgColor: "gray.800" }}
              px="50px"
            >
              <Flex width={colWidth[0]}>{submission.id}</Flex>
              <Flex width={colWidth[1]}>{submission.status}</Flex>
              <Flex width={colWidth[2]}>{submission.score}</Flex>
              <Flex width={colWidth[3]}>{submission.type}</Flex>
              <Flex width={colWidth[4]}>{submission.submittedAt}</Flex>
            </Flex>
          </>
        );
      })}
    </Box>
  );
};
