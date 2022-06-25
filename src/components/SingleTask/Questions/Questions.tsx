import { Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { time } from "console";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timestampToDate } from "src/components/utils/time";
import { fetchQuestions } from "src/services/services";

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
              navigate(`/question?id=${id}`);
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
        <Flex fontSize={"sm"}>{numReply}</Flex>
      </Flex>
      <Divider />
    </Flex>
  );
};

const Questions = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [topQuestions, setTopQuestions] = useState<QuestionProps[]>([]);

  useEffect(() => {
    const data = fetchQuestions("", true);
    setQuestions(data?.questions || []);
    setTopQuestions(data?.topQuestions || []);
  }, []);

  const QuestionHead = () => {
    return (
      <Flex
        width={"full"}
        bgColor="gray.700"
        flexDirection={"row"}
        fontSize="xl"
        alignItems={"center"}
        height="100px"
        borderTopRadius={"16px"}
      >
        <Flex ml={8}> {questions.length} Questions </Flex>
      </Flex>
    );
  };

  return (
    <Box width="1300px">
      <QuestionHead />
      {questions.map((question: QuestionProps) => {
        return (
          <QuestionRow
            name={question.name}
            id={question.id}
            menteeName={question.menteeName}
            timestamp={question.timestamp}
            numReply={question.numReply}
            menteeId={question.menteeId}
          />
        );
      })}
    </Box>
  );
};

export default Questions;
