import React, { useEffect, useState } from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import ScoreTableItems from "../components/ScoreTableItems";
import scoreServices from "../services/scores.js";
import { NavLink } from "react-router-dom";
import GoBack from "../components/GoBack";

const HighScorePage = () => {
  const [prevScore, setPrevScore] = useState([]);
  const [bestScore, setBestScore] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const prevScoreData = await scoreServices.getLastScore();
        setPrevScore(prevScoreData);
        const bestScoreData = await scoreServices.getBestScore();
        setBestScore(bestScoreData);
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
        <Text align="center">Previous Score: {prevScore}</Text>
        <Text align="center">Highest Score: {bestScore}</Text>
      </Flex>
      <Flex direction="column">
        <ScoreTableItems />
        <GoBack />
      </Flex>
    </Flex>
  );
};

export default HighScorePage;
