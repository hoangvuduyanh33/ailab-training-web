import { Box, Button, Divider, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PageLayout from "src/components/common/PageLayout";
import {
  TableHeadLayout,
  TableLayout,
} from "src/components/common/TableLayouts";
import { timestampToDate } from "src/components/utils/time";
import { JudgeModal } from "./JudgeModal";

interface MentorSubmission {
  menteeName: string;
  menteeId: number;
  status: string; //pending, judged, aborted
  score: number;
  type: string; //pdf, link
  submittedAt: number;
}

const colWidth = ["20%", "20%", "20%", "20%", "20%"];
const exampleSubmisisons: MentorSubmission[] = [
  {
    menteeId: 10000001,
    menteeName: "Nguyen Van A",
    status: "pending",
    score: 10,
    type: "PDF",
    submittedAt: Date.now(),
  },
  {
    menteeId: 10000002,
    menteeName: "Nguyen Van B",
    status: "pending",
    score: 8,
    type: "PDF",
    submittedAt: Date.now(),
  },
  {
    menteeId: 10000003,
    menteeName: "Nguyen Van C",
    status: "judged",
    score: 8,
    type: "Link",
    submittedAt: Date.now(),
  },
  {
    menteeId: 10000004,
    menteeName: "Nguyen Van D",
    status: "aborted",
    score: 8,
    type: "Link",
    submittedAt: Date.now(),
  },
  {
    menteeId: 10000005,
    menteeName: "Nguyen Van E",
    status: "pending",
    score: 8,
    type: "PDF",
    submittedAt: Date.now(),
  },
  {
    menteeId: 10000005,
    menteeName: "Nguyen Van E",
    status: "pending",
    score: -1,
    type: "PDF",
    submittedAt: Date.now(),
  }
];
export const MentorSubmissionsTable = () => {
  const [submissions, setSubmissions] = useState<MentorSubmission[]>([]);
  useEffect(() => {
    setSubmissions(exampleSubmisisons);
  }, []);
  const handleSortBy = (x: number) => {
    const newSubmissions = [...submissions];
    if (x === 1) {
      setSubmissions(
        newSubmissions[0].status === "judged"
          ? newSubmissions.sort((a, b) => {
            if (a.status === "pending") return -1;
            if (b.status === "pending") return 1;
            if (a.status === "judged") return -1;
            if (b.status === "judged") return 1;
            return 0;
          })
          : newSubmissions.sort((a, b) => {
            if (a.status === "judged") return -1;
            if (b.status === "judged") return 1;
            if (a.status === "pending") return -1;
            if (b.status === "pending") return 1;
            return 0;
          })
      );
    }
    if (x === 2) {
      setSubmissions(
        newSubmissions[0].score <
          newSubmissions[newSubmissions.length - 1].score
          ? newSubmissions.sort((a, b) => {
            return b.score - a.score;
          })
          : newSubmissions.sort((a, b) => {
            return a.score - b.score;
          })
      );
    }
    if (x === 3) {
      setSubmissions(
        newSubmissions[0].type < newSubmissions[newSubmissions.length - 1].type
          ? newSubmissions.sort((a, b) => {
            return a.type < b.type ? 1 : a.type === b.type ? 0 : -1;
          })
          : newSubmissions.sort((a, b) => {
            return a.type > b.type ? 1 : a.type === b.type ? 0 : -1;
          })
      );
    }
  };
  const { isOpen: isJudgeModalOpen, onClose: onJudgeModalClose, onOpen: onJudgeModalOpen } = useDisclosure();
  const [selectedId, setSelectedId] = useState(0);
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
        px="50px"
        cursor={"pointer"}
      >
        <Flex
          width={colWidth[0]}
          _hover={{ color: "primary.200" }}
          height="100%"
          alignItems={"center"}
        >
          Name
        </Flex>
        <Flex
          width={colWidth[1]}
          _hover={{ color: "primary.200" }}
          onClick={() => {
            handleSortBy(1);
          }}
          height="100%"
          alignItems={"center"}
        >
          Status
        </Flex>
        <Flex
          width={colWidth[2]}
          _hover={{ color: "primary.200" }}
          height="100%"
          alignItems={"center"}
          onClick={() => {
            handleSortBy(2);
          }}
        >
          Score
        </Flex>
        <Flex
          width={colWidth[3]}
          _hover={{ color: "primary.200" }}
          height="100%"
          alignItems={"center"}
          onClick={() => {
            handleSortBy(3);
          }}
        >
          Type
        </Flex>
        <Flex
          width={colWidth[4]}
          _hover={{ color: "primary.200" }}
          height="100%"
          alignItems={"center"}
        >
          Submitted At
        </Flex>
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
              <Flex width={colWidth[0]}>{submission.menteeName}</Flex>
              <Flex width={colWidth[1]}>{submission.status}</Flex>
              <Flex width={colWidth[2]}>{submission.score === -1 && submission.status === "pending" ?
                <Button colorScheme={"primary"} onClick={() => { setSelectedId(submission.menteeId); onJudgeModalOpen() }}>Judge</Button> : submission.score
              }
              </Flex>
              <Flex width={colWidth[3]}>{submission.type}</Flex>
              <Flex width={colWidth[4]}>{timestampToDate(submission.submittedAt)}</Flex>

            </Flex>
          </>
        );
      })}
      <JudgeModal isOpen={isJudgeModalOpen} onClose={onJudgeModalClose} menteeId={selectedId} />

    </Box>
  );
};
