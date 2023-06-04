import React from 'react';
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import ScoreTableItems from '../components/ScoreTableItems';
import { NavLink } from 'react-router-dom';

const HighScorePage = () => {

  return (
    <Flex direction='column' align='center' justify='center'>
      <Flex direction='column' justify='center' align='center' m={4}>
        <Heading my={5} fontSize="4xl" textAlign='center'>Highscores!</Heading>
        <Text align='center'>Where do you rank among the best?</Text>
      </Flex>
      <Flex direction='column' mt={4} mb={6} border='8px dotted black' p={4}>
        <Text align='center'>Previous Score: 30</Text>
        <Text align='center'>Highest Score: 100</Text>
      </Flex>
      <Flex direction='column'>
        <ScoreTableItems/>
        <Flex justify='center'>
          <NavLink to="/">
            <Button className="glow-on-hover" m={4}>Main Menu</Button>
          </NavLink>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HighScorePage
