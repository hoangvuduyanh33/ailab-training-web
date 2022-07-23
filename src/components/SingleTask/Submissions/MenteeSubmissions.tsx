import { Box, Button, Divider, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { useAppSelector } from "src/app/hooks";
import PageLayout from "src/components/common/PageLayout";
import {
  TableHeadLayout,
  TableLayout,
} from "src/components/common/TableLayouts";
import { timestampToDate } from "src/components/utils/time";
import { useSubmission, useSubmissions } from "src/hooks/useSubmissions";
import { userSelector } from "src/store/user";
import { SubmitModal } from "./SubmitModal";

interface MenteeSubmission {
  id: number;
  status: string; //pending, judged, aborted
  score: number;
  type: string; //pdf, link
  submittedAt: string;
}

const colWidth = ["30%", "20%", "20%", "20%", "20%"];
export const MenteeSubmissionsTable = () => {
  const [submissions, loading] = useSubmissions();
  const { userId } = useAppSelector(userSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("submissions = ", submissions);
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
          {submissions.length} Submission
        </Flex>
        <Spacer />
        <Button colorScheme="primary" onClick={onOpen}>Submit</Button>
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
        <Flex width={colWidth[2]}>Score</Flex>
        <Flex width={colWidth[3]}>Type</Flex>
        <Flex width={colWidth[4]}>Submitted At</Flex>
      </Flex>
      {submissions.map((submission: any) => {
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
              <Flex width={colWidth[0]}>{submission.submissionId}</Flex>
              <Flex width={colWidth[2]}>{submission.score == -1 ? "pending" : submission.score}</Flex>
              <Flex width={colWidth[3]}>{submission.type}</Flex>
              <Flex width={colWidth[4]}>{timestampToDate(submission.submittedAt)}</Flex>
            </Flex>
          </>
        );
      })}
      <SubmitModal onClose={onClose} isOpen={isOpen} menteeId={userId} />
    </Box>
  );
};
