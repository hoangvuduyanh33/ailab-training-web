import { Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { time } from "console";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timestampToDate } from "src/components/utils/time";
import { useQuestions } from "src/hooks/useQuestions";

interface QuestionProps {
  name: string;
  id: string;
  menteeName: string;
  menteeId: string;
  numReply: number;
  timestamp: number;
}

interface QuestionsProps {
  questions: QuestionProps[];
  topQuestions: QuestionProps[];
}

const QuestionRow = (props: QuestionProps) => {
  const { name, id, timestamp, menteeName, menteeId, numReply } = props;
  const navigate = useNavigate();
  console.log(
    "name = ",
    name,
    " timestamp = ",
    timestamp,
    " menteeName = ",
    menteeName,
    " menteeId = ",
    menteeId,
    " numReply = ",
    numReply
  );
  return (
    <Flex flexDirection={"column"}>
      <Flex
        width="full"
        flexDirection={"row"}
        fontSize="xl"
        _hover={{ bgColor: "gray.800" }}
        px={6}
        borderLeft="1px solid rgba(255,255,255,0.2)"
      >
        <Flex flexDirection={"column"}>
          <Flex
            cursor={"pointer"}
            _hover={{ color: "primary.200" }}
            onClick={() => {
              navigate(`/question/${id}`);
            }}
          >
            {name}
          </Flex>
          <Flex fontSize="md" flexDir="row" color="whiteAlpha.500">
            Asked by{"  "}
            <Flex
              _hover={{ color: "primary.200" }}
              cursor="pointer"
              onClick={() => navigate(`/mentee/${menteeId}`)}
              as={"span"}
              mx={2}
            >
              {menteeName}
            </Flex>{" "}
            at <Flex ml={2}>{timestampToDate(timestamp)}</Flex>
          </Flex>
        </Flex>
        <Spacer />
        <Flex fontSize={"sm"} flexDir="row" alignItems={"center"}>
          <ChatIcon boxSize={"15px"} mr={2} />
          {numReply}
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  );
};

const Questions = () => {
  const [questions, loading] = useQuestions();
  console.log("questions = ", questions);
  const QuestionHead = () => {
    return (
      <Flex
        width={"full"}
        bgColor="gray.700"
        flexDirection={"row"}
        fontSize="3xl"
        alignItems={"center"}
        height="100px"
        borderTopRadius={"16px"}
      >
        <Flex ml={8}> {questions?.length || 0} Questions </Flex>
      </Flex>
    );
  };

  return (
    <Box width="1300px" height={"auto"}>
      <QuestionHead />
      {questions.map((question: any) => {
        return (
          <QuestionRow
            name={question.title}
            id={question.questionId}
            menteeName={question.userName}
            timestamp={question.createdAt}
            numReply={question.numReplies}
            menteeId={question.userId}
          />
        );
      })}
    </Box>
  );
};

export default Questions;
