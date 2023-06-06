import React from 'react'
import { Button } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';

const GameButtons = () => {
  return (
    <Flex justify="center" align="center" direction="column" mx={4}>
        <NavLink to="/highscores">
            <Button m={3} className="glow-on-hover">
                Highscores
            </Button>
        </NavLink>
    </Flex>
  )
}

export default GameButtons