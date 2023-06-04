import React from 'react';
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { ImArrowLeft } from "react-icons/im";
import ScoreTableItems from '../components/ScoreTableItems';

const HighScorePage = () => {
  // Object expected from getAllScores is in message with golan
  return (
    <Flex direction='column' align='center' justify='center'>
      <Flex direction='column' justify='center' align='center' m={4}>
        <Heading my={5} fontSize="4xl" textAlign='center'>Highscores!</Heading>
        <Text align='center'>Where do you rank among the best?</Text>
      </Flex>
      <Flex>
        <ScoreTableItems/>
      </Flex>
    </Flex>
  );
};

export default HighScorePage
