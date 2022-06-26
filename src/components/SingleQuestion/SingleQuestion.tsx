import { Button, Divider, Flex, Image, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "src/hooks/useQuery";
import { fetchSingleQuestion } from "src/services/services";
import PageLayout from "../common/PageLayout";
import { timestampToDate } from "../utils/time";

import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";

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
}

const ChatItem = (props: ChatItemProps) => {
  const { userName, userId, content, timestamp } = props;
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
            commented at {timestampToDate(timestamp)}
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
  const { query } = useQuery();
  const navigate = useNavigate();
  const id = query.get("id");
  console.log(id);
  const [question, setQuestion] = useState<SingleQuestionProps>();
  const [reply, setReply] = useState("");
  useEffect(() => {
    const data = fetchSingleQuestion("", true);
    if (data) {
      setQuestion(data);
    }
  }, []);

  return (
    <PageLayout width="1400px">
      <Flex flexDir={"column"} fontSize="4xl">
        <Flex>{question?.name}</Flex>
        <Flex width="full" fontSize={"md"}>
          <Flex
            _hover={{ color: "primary.200" }}
            cursor="pointer"
            mr={2}
            onClick={() => {
              navigate(`/user?id=${question?.menteeId}`);
            }}
          >
            {question?.menteeName}
          </Flex>
          <Flex color={"whiteAlpha.500"}>
            asked this question at {timestampToDate(question?.timestamp || 0)}
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      {question && (
        <ChatItem
          userName={question?.menteeName}
          userId={question?.menteeId}
          content={question?.content}
          timestamp={question?.timestamp}
        />
      )}
      {question &&
        question?.replies.map((reply) => {
          return (
            <ChatItem
              userName={reply.userName}
              userId={reply.userId}
              content={reply.content}
              timestamp={reply.timestamp}
            />
          );
        })}
      <Flex flexDir="row" maxWidth={"1300px"} mt={5}>
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
            <Button mt={2} colorScheme={"primary"} width="150px">
              Confirm
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default SingleQuestion;
