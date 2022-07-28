import { Button, CircularProgress, Divider, Flex, Image, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "src/hooks/useQuery";
import PageLayout from "../common/PageLayout";
import { timestampToDate } from "../utils/time";

import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useQuestion } from "src/hooks/useQuestions";
import { replyApi } from "src/services";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { userSelector } from "src/store/user";
import { useAnimationFrame } from "framer-motion";

export interface ReplyProps {
  userName: string;
  userId: string;
  content: string;
  timestamp: number;
}

export interface SingleQuestionProps {
  menteeName: string;
  menteeId: string;
  name: string;
  content: string;
  timestamp: number;
  replies: ReplyProps[];
}

export interface ChatItemProps {
  userName: string;
  userId: string;
  content: string;
  timestamp: number;
  isQuestion: boolean;
}

const ChatItem = (props: ChatItemProps) => {
  const { userName, userId, content, timestamp, isQuestion } = props;
  const navigate = useNavigate();
  return (
    <Flex flexDir={"row"} width={"full"} mt={5}>
      <Flex alignSelf={"flex-start"} boxSize="40px" mr={5}>
        <Image src="./logo192.png" />
      </Flex>
      <Flex
        alignSelf={"flex-start"}
        flexDir="column"
        width={"1200px"}
        border={"1px solid rgba(255,255,255,0.5)"}
        borderRadius="16px"
        bgColor="#101414"
      >
        <Flex
          width="full"
          bgColor="gray.700"
          px={5}
          py={2}
          fontSize={"md"}
          borderTopRadius="16px"
        >
          <Flex
            _hover={{ color: "primary.200" }}
            cursor="pointer"
            mr={2}
            onClick={() => {
              navigate(`/user?id=${userId}`);
            }}
          >
            {userName}
          </Flex>
          <Flex color={"whiteAlpha.500"}>
            {isQuestion ? "asked a question" : "commented"} at {timestampToDate(timestamp)}
          </Flex>
        </Flex>
        <Flex
          borderEndEndRadius={"16px"}
          minHeight="50px"
          fontSize={"sm"}
          height="auto"
          px={5}
          pt={3}
          pb={5}
          flexDirection="column"
        >
          <MarkdownPreview source={content} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const SingleQuestion = () => {
  const navigate = useNavigate();
  const [reply, setReply] = useState("");
  const [data, loading] = useQuestion();
  const [question, setQuestion] = useState<any>();
  const [replies, setReplies] = useState<any>([]);
  const [numSubmit, setNumSubmit] = useState(0);
  const { userId, name } = useAppSelector(userSelector);
  useEffect(() => {
    console.log("data = ", data)
    if (data) {
      setQuestion(data.question);
      setReplies(data.replies);
    }
  }, [data, numSubmit]);

  if (!loading && !question && !replies) {
    return <PageLayout>
      No Data
    </PageLayout>
  }

  const handleCreateReply = () => {
    replyApi.createReply({
      userId: userId,
      userName: name,
      questionId: question.questionId,
      content: reply,
    }).then((response) => {
      console.log("response = ", response);
    })
  }

  return (
    <PageLayout width="1400px" height="auto">
      {
        loading && <Flex>
          <CircularProgress isIndeterminate />
        </Flex>
      }
      {!loading && question && <Flex flexDir={"column"} fontSize="4xl">
        <Flex>{question?.title || ""}</Flex>
        <Flex width="full" fontSize={"md"}>
          <Flex
            _hover={{ color: "primary.200" }}
            cursor="pointer"
            mr={2}
            onClick={() => {
              navigate(`/user/${question?.userId}`);
            }}
          >
            {question?.userName}
          </Flex>
          <Flex color={"whiteAlpha.500"}>
            asked this question at {timestampToDate(question?.timestamp || 0)}
          </Flex>
        </Flex>
      </Flex>}
      <Divider />
      {!loading && question && (
        <ChatItem
          userName={question?.userName}
          userId={question?.userId}
          content={question?.content}
          timestamp={question?.createdAt}
          isQuestion={true}
        />
      )}
      {!loading && replies && replies.sort((a: any, b: any) => {
        if (a.createdAt > b.createdAt) {
          return -1
        }
        if (a.createdAt < b.createdAt) {
          return 1
        }
        return 0
      }).map((reply: any) => {
        return (
          <ChatItem
            userName={reply.userName}
            userId={reply.userId}
            content={reply.content}
            timestamp={reply.createdAt}
            isQuestion={false}
          />
        );
      })}
      {!loading && <Flex flexDir="row" maxWidth={"1300px"} mt={5}>
        <Image src="./logo192.png" boxSize={"40px"} mr={5} />
        <Flex flexDir={"column"}>
          <MDEditor
            preview="edit"
            style={{ width: "1200px" }}
            value={reply}
            onChange={(value) => {
              setReply(value!);
            }}
          />
          <Flex flexDirection={"row"}>
            <Spacer />
            <Button mt={2} colorScheme={"primary"} width="150px" onClick={handleCreateReply}>
              Confirm
            </Button>
          </Flex>
        </Flex>
      </Flex>}
    </PageLayout>
  );
};

export default SingleQuestion;
