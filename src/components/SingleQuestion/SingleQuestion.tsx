import { Button, CircularProgress, Divider, Flex, Image, Skeleton, Spacer } from "@chakra-ui/react";
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
import Default from 'src/assets/default-avatar.jpeg';
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
    <Flex flexDir={"row"} width={"full"} mt={5} >
      <Flex alignSelf={"flex-start"} boxSize="40px" mr={5} borderRadius="40px">
        <Image src={Default} borderRadius="full" />
      </Flex>
      <Flex
        alignSelf={"flex-start"}
        flexDir="column"
        width={"1200px"}
        borderTopRadius="16px"
        border={"1px solid rgba(255,255,255,0.5)"}
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
          borderEndRadius={"16px"}
          borderBottomEndRadius="16px"
          minHeight="50px"
          fontSize={"sm"}
          height="auto"
          px={5}
          pt={3}
          pb={5}
          flexDirection="column"
          bgColor={"#0d1116"}
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
  const [isPosting, setPosting] = useState(false);
  useEffect(() => {
    console.log("data = ", data);
    if (data) {
      setQuestion(data.question);
      setReplies(data.replies);
    }
  }, [data, numSubmit, isPosting]);

  if (!loading && !question && !replies) {
    return <PageLayout>
      No Data
    </PageLayout>
  }

  const handleCreateReply = () => {
    setPosting(true);
    replyApi.createReply({
      userId: userId,
      userName: name,
      questionId: question.questionId,
      content: reply,
    }).then((response) => {
      console.log("response = ", response);
      setPosting(false);
    })
  }

  return (
    <PageLayout width="1400px" height="auto">
      {
        loading && <Flex flexDir={"column"}>
          <Skeleton height={"50px"} width="300px" />
          <Skeleton height={"20px"} width="500px" />

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
          return 1
        }
        if (a.createdAt < b.createdAt) {
          return -1
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
      {!loading && question && < Flex flexDir="row" maxWidth={"1300px"} mt={5}>
        <Image src={Default} boxSize={"40px"} mr={5} borderRadius="full" />
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
            <Button mt={2}
              isLoading={isPosting}
              colorScheme={"primary"} width="150px" isDisabled={isPosting} onClick={() => { handleCreateReply(); setNumSubmit(numSubmit + 1); setReply("") }}>
              {"Confirm"}
            </Button>
          </Flex>
        </Flex>
      </Flex>}
      {
        !loading && !question && "No data"
      }

    </PageLayout >
  );
};

export default SingleQuestion;
