import { Box, Button, Divider, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InternalLink } from "src/components/common/InternalLink";
import { timestampToDate } from "src/components/utils/time";
import { useSubmissions } from "src/hooks/useSubmissions";
import { JudgeModal } from "./JudgeModal";

const colWidth = ["20%", "20%", "20%", "20%", "20%"];

export const MentorSubmissionsTable = () => {
  const [submissions, setSubmissions] = useState<any>([]);
  const [data, loading] = useSubmissions();
  console.log("loading = ", loading);
  console.log("submissions = ", submissions);
  useEffect(() => {
    setSubmissions(data.sort(
      (a: any, b: any) => {
        if (a.submittedAt > b.submittedAt) {
          return -1;
        }
        return (a.submittedAt == b.submittedAt) ? 0 : 1;
      }
    ));
  }, [data]);
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
  const [selectedId, setSelectedId] = useState("");
  const [type, setType] = useState("");
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
        <Flex fontSize={"30px"}>Submissions</Flex>
        <Flex fontSize="16px" color={"whiteAlpha.500"} ml={5}>
          {submissions.length} Submissions
        </Flex>
        <Spacer />
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
        {/* <Flex
          width={colWidth[1]}
          _hover={{ color: "primary.200" }}
          onClick={() => {
            handleSortBy(1);
          }}
          height="100%"
          alignItems={"center"}
        >
          Status
        </Flex> */}
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
      {submissions.map((submission: any) => {
        console.log(submission.score);
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

              <Flex width={colWidth[0]}>
                <InternalLink href={`/user/${submission.menteeId}`}>
                  {submission.menteeName}
                </InternalLink>
              </Flex>
              <Flex width={colWidth[1]}>{submission.score === -1 ?
                <Button colorScheme={"primary"} onClick={() => {
                  setSelectedId(submission.submissionId);
                  onJudgeModalOpen()
                  setType(submission.type)
                }}>Grading</Button> : submission.score
              }
              </Flex>
              <Flex width={colWidth[2]}>{submission.type}</Flex>
              <Flex width={colWidth[3]}>{timestampToDate(submission.submittedAt)}</Flex>

            </Flex>
          </>
        );
      })}
      <JudgeModal isOpen={isJudgeModalOpen} onClose={onJudgeModalClose} submissionId={selectedId} type={type} />

    </Box>
  );
};
