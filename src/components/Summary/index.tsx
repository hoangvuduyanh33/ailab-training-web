import { Box, Flex, Image, Spacer, SimpleGrid } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setSelectedTag, summarySelector } from "src/store/summary";
import { userSelector } from "src/store/user";
import MenteeCourseTable, {
  exampleMenteeCourses,
} from "../Courses/CourseTables/MenteeCourseTable";
import MentorCourseTable, {
  exampleMentorCourses,
} from "../Courses/CourseTables/MentorCourseTable";

interface TagOverviewProps {
  name: string;
  rel: number;
  avg: number;
  isSelected: boolean;
}

const TagOverview = (props: TagOverviewProps) => {
  const { name, rel, avg, isSelected } = props;
  const dispatch = useAppDispatch();
  return (
    <Flex
      flexDirection={"column"}
      width="250px"
      height={"64px"}
      bgColor={isSelected ? "primary.400" : "gray.700"}
      border={isSelected ? "1px solid" : ""}
      borderColor={isSelected ? "primary.300" : ""}
      fontSize="16px"
      borderRadius="16px"
      padding="8px"
      mr={3}
      _hover={{
        border: "1px solid #47B5FF",
      }}
      cursor="pointer"
      onClick={() => dispatch(setSelectedTag(name))}
    >
      <Flex>{name}</Flex>
      <Spacer />
      <Flex width={"100%"} color={"whiteAlpha.500"} fontSize="14px">
        <Flex>Avg: {avg}</Flex>
        <Flex ml={2}>Rel: {rel}%</Flex>
      </Flex>
    </Flex>
  );
};

const tagOVerviews = [
  {
    name: "Overview",
    rel: 9.0,
    avg: 5.6,
  },
  {
    name: "NLP",
    rel: 75,
    avg: 5.6,
  },
  {
    name: "Image Processing",
    rel: 90,
    avg: 9.0,
  },
];

export default function Summary() {
  const { name, role } = useAppSelector(userSelector);

  console.log("name = ", name);

  const { selectedTag } = useAppSelector(summarySelector);

  const SummaryHeader = () => {
    return (
      <Flex flexDir={"row"} width="full" fontSize="20px" alignItems="center">
        <Image boxSize="80px" borderRadius={"16px"} src="./favicon.ico" />
        <Flex flexDirection={"column"} ml="20px">
          <Flex color="white">{name}</Flex>
          <Flex color={"whiteAlpha.700"}>Avg: 9.0</Flex>
          <Flex color={"whiteAlpha.700"}>Rel: 80%</Flex>
        </Flex>
      </Flex>
    );
  };

  const SummaryTags = () => {
    return (
      <SimpleGrid width={"full"} columns={5} columnGap={4} rowGap={3} mt={5}>
        {tagOVerviews.map((overview) => (
          <TagOverview
            name={overview.name}
            rel={overview.rel}
            avg={overview.avg}
            isSelected={selectedTag === overview.name}
          />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Box width="calc(100vw-220px)" fontSize="3xl" ml={220} mt={5}>
      <SummaryHeader />
      <SummaryTags />
      {role === "mentee" && (
        <MenteeCourseTable courses={exampleMenteeCourses} />
      )}
      {role === "mentor" && (
        <MentorCourseTable courses={exampleMentorCourses} />
      )}
    </Box>
  );
}
