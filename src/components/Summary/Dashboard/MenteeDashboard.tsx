import { background, Box, Divider, Flex, Grid, GridItem, Spacer, Text } from "@chakra-ui/react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";

import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { ChevronDownIcon, ChevronUpIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useAppSelector } from "src/app/hooks";
import user, { userSelector } from "src/store/user";
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);
const labels = Array.from(Array(11).keys())
const x = [1, 1, 1, 5, 10, 13, 20, 25, 20, 10, 2]

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Score',
      data: labels.map((data) => x[data]),
      backgroundColor: "yellow",
    }
  ]
};

const labels2 = Array.from(Array(11).keys()).map((value) => { return (value + 9) * 100 });
const x2 = [4, 5, 6, 10, 30, 25, 10, 5, 5, 3];

const data3 = {
  labels: [
    'Win',
    'Lose',
    'Draw',
  ],
  datasets: [{
    label: "Winrate",
    data: [300, 50, 250],
    backgroundColor: [
      "green",
      "red",
      "yellow"
    ]
  }]
}

export const data2 = {
  responsive: true,
  labels,
  datasets: [
    {
      label: 'Rating',
      data: labels2.map((data) => x2[Math.round(data / 100) - 9]),
      backgroundColor: "blue",
    }
  ]
}

const MenteeDashboard = () => {
  console.log("labels2 = ", labels2);
  const { userId, email, name, userClass } = useAppSelector(userSelector);
  const props = useAppSelector(userSelector);
  console.log("userId = ", userId, " email = ", email, " userClass = ", userClass);
  console.log("props = ", props);
  const Info = ({ name, number, color, percent }: any) => {
    return <Flex flexDir={"column"} width={300} borderBottom="2px solid" borderBottomColor={color} bgColor="gray.700" px={2} py={4}>
      <Flex color={"whiteAlpha.500"}>{name}</Flex>

      <Flex fontSize={35} flexDir="row" alignItems={"center"}>
        <Flex>{number}</Flex>
        <Flex flexDir={"row"} fontSize={17} alignItems="center" color={"whiteAlpha.500"}>
          {(color == "red") && <TriangleDownIcon fontSize={15} color={color} ml={2} />}
          {(color == "green") && <TriangleUpIcon fontSize={15} color={color} ml={2} />}
          {(color != "white" && percent) && <Text>{percent}% from last week</Text>}
        </Flex>
      </Flex>
    </Flex>
  }
  const OverallInfo = () => {
    return (
      <Flex width={"100%"} height={130} flexDirection={"row"} alignItems={"center"} >
        <Grid templateColumns={'repeat(6,1fr)'} fontSize={20} gap={6}>
          <GridItem colSpan={1}>
            <Info name="Rating" number={props.rating} color="white" />
          </GridItem>
          <GridItem colSpan={1}>
            <Info name="Score" number={props.score} color="white" percent={3} />
          </GridItem>
          <GridItem colSpan={1}>
            <Info name="Average relative score" number={props.avgScore} color="white" percent={5} />
          </GridItem>
          <GridItem colSpan={1}>
            <Info name="Number of remaining tasks" number={(props.numberOfAssignedTasks || 0) - (props.numberOfFinishedTasks || 0) - (props.numberOfPendingTasks || 0)} color="white" />
          </GridItem>
          <GridItem colSpan={1}>
            <Info name="Number of finished tasks" number={props.numberOfFinishedTasks} color="white" percent={5} />
          </GridItem>
        </Grid>
      </Flex>
    )
  }
  const ScoreDistribution = () => {
    return (
      <Flex width={"100%"} height={460} bgColor="gray.700" flexDirection={"column"} px={5} py={4}>
        <Flex fontSize={20} color={"whiteAlpha.500"}>Relative score distribution</Flex>
        <Bar data={data} options={options} />
      </Flex>
    )
  }
  const RatingDistribution = () => {
    return (
      <Flex width={"100%"} height={460} bgColor="gray.700" flexDirection={"column"} px={5} py={4}>
        <Flex fontSize={20} color={"whiteAlpha.500"}>Rating distribution</Flex>
        <Bar data={data2} options={options} />
      </Flex>
    )
  }
  // return <Bar options={options} data={data} />>

  const TopRating = ({ name }: any) => {
    return (
      <Flex flexDir={"column"} bgColor="gray.700" px={3} py={4} height={280}>
        <Flex color={"whiteAlpha.500"} fontSize={20}>{name}</Flex>
        <Flex fontSize={20} flexDirection="row" py={3} color={"red"}>
          <Flex>Bui Hoang</Flex>
          <Spacer />
          <Flex>1965</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3} color={"red"}>
          <Flex>Tran Minh</Flex>
          <Spacer />
          <Flex>1830</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3} color={"yellow"}>
          <Flex>Le Hieu</Flex>
          <Spacer />
          <Flex>1713</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3} color="whiteAlpha.500">
          <Flex>Average</Flex>
          <Spacer />
          <Flex>1600</Flex>
        </Flex>

      </Flex>
    )
  }

  const WinRate = () => {
    return <Flex flexDir={"column"} bgColor="gray.700" height={280} px={3} py={4}>
      <Flex color="whiteAlpha.500" fontSize={20}>Winrate</Flex>
      <Flex flexDir={"row"} alignItems="flex-start" mt={5}>
        <Flex width={"240px"} alignSelf="center">
          <Pie data={data3} width="240px" options={{ maintainAspectRatio: false }} />
        </Flex>
        <Spacer />
        <Flex flexDirection={"column"}>
          <Flex flexDirection={"row"} alignItems="center">
            <Box width={"30px"} height="20px" bgColor={"green"} border="1px solid" borderColor={"white"}></Box>
            <Flex fontSize={"20px"} ml={2} color="whiteAlpha.500">Win</Flex>
          </Flex>
          <Flex flexDirection={"row"} alignItems="center">
            <Box width={"30px"} height="20px" bgColor={"red"} border="1px solid" borderColor={"white"}></Box>
            <Flex fontSize={"20px"} ml={2} color="whiteAlpha.500">Lose</Flex>
          </Flex>
          <Flex flexDirection={"row"} alignItems="center">
            <Box width={"30px"} height="20px" bgColor={"Yellow"} border="1px solid" borderColor={"white"}></Box>
            <Flex fontSize={"20px"} ml={2} color="whiteAlpha.500">Draw</Flex>
          </Flex>

        </Flex>
      </Flex>
    </Flex>
  }

  const TopScore = ({ name }: any) => {
    return (
      <Flex flexDir={"column"} bgColor="gray.700" px={3} py={4} height={280}>
        <Flex color={"whiteAlpha.500"} fontSize={20}>Top Score</Flex>
        <Flex fontSize={20} flexDirection="row" py={3}>
          <Flex>Le Minh</Flex>
          <Spacer />
          <Flex>100</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3}>
          <Flex>Tran Hieu</Flex>
          <Spacer />
          <Flex>90</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3}>
          <Flex>Hoang Vu</Flex>
          <Spacer />
          <Flex>70</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3} color="whiteAlpha.500">
          <Flex>Average</Flex>
          <Spacer />
          <Flex>50</Flex>
        </Flex>
      </Flex >
    )
  }

  const TopActiveTasks = ({ name }: any) => {
    return (
      <Flex flexDir={"column"} bgColor="gray.700" px={3} py={4} height={280}>
        <Flex color={"whiteAlpha.500"} fontSize={20}>Top Active Tasks</Flex>
        <Flex fontSize={20} flexDirection="row" py={3}>
          <Flex>Task #2132</Flex>
          <Spacer />
          <Flex>60</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3}>
          <Flex>Task #6544</Flex>
          <Spacer />
          <Flex>50</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3}>
          <Flex>Task #1232</Flex>
          <Spacer />
          <Flex>30</Flex>
        </Flex>
        <Divider />
        <Flex fontSize={20} flexDirection="row" py={3} color="whiteAlpha.500">
          <Flex>Task #3021</Flex>
          <Spacer />
          <Flex>10</Flex>
        </Flex>
      </Flex >
    )
  }

  return (
    <Box width={"1600px"}>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        <GridItem colSpan={1}>
          <Flex>{name} {userClass}</Flex>
        </GridItem>

        <GridItem colSpan={4} mt={4}>
          <OverallInfo />
        </GridItem>
        <GridItem colSpan={2}>
          <ScoreDistribution />
        </GridItem>
        <GridItem colSpan={2}>
          <RatingDistribution />
        </GridItem>
        <GridItem colSpan={1}>
          <TopRating name={"Top Rating"} />
        </GridItem>
        <GridItem colSpan={1}>
          <WinRate />
        </GridItem>
        <GridItem colSpan={1}>
          <TopScore />
        </GridItem>
        <GridItem colSpan={1}>
          <TopActiveTasks />
        </GridItem>
      </Grid>
    </Box>
  )

}

export default MenteeDashboard;