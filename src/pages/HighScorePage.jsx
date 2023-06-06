import { useEffect, useState } from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import ScoreTableItems from "../components/ScoreTableItems";
import scoreServices from "../services/scores.js";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import GoBack from "../components/GoBack";

const HighScorePage = () => {
  const [prevScore, setPrevScore] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const prevScoreData = await scoreServices.getLastScore(user.id);
        setPrevScore(prevScoreData[0].score);
        const bestScoreData = await scoreServices.getBestScore(user.id);
        setBestScore(bestScoreData[0].score);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };
    fetchScores();
  }, []);

  return (
    <Flex direction="column" align="center" justify="center">
      <Flex direction="column" justify="center" align="center" m={4}>
        <Heading my={5} fontSize="4xl" textAlign="center">
          Highscores!
        </Heading>
        <Text align="center">Where do you rank among the best?</Text>
      </Flex>
      <Flex direction="column" mt={4} mb={6} border="8px dotted black" p={4}>
        <Text align="center">
          Previous round: {prevScore ? prevScore : "--"}
        </Text>
        <Text align="center">
          Highest round: {bestScore ? bestScore : "--"}
        </Text>
      </Flex>
      <Flex direction="column">
        <ScoreTableItems />
        <Flex justify="center" align="center" direction="column">
          <GoBack/>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HighScorePage;
