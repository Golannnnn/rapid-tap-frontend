import { useState, useEffect } from "react";
import Circle from "./Circle";
import { Flex, Text, Heading, Button } from "@chakra-ui/react";

const TapMode = () => {
  const [gameProgress, setGameProgress] = useState({
    round: 1,
    timer: 0,
  });
  const [circleDimensions, setCircleDimensions] = useState({
    outerRadius: 100,
    innerRadius: 50,
  });
  const [timeLimit, setTimeLimit] = useState(10);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    const calculateDimensions = (round) => {
      // outerRadius is increasing by 10 every round and starts at 100
      const outerRadius = 100 + round * 10;
      // innerRadius is decreasing by 5 every round and starts at 50
      const innerRadius = 50 - round * 2;
      return { outerRadius, innerRadius };
    };

    const calculateTimeLimit = () => {
      // decreases by 1 every round and starts at 10
      return timeLimit - 1;
    };

    const dimensions = calculateDimensions(gameProgress.round);
    const limit = calculateTimeLimit();

    setCircleDimensions(dimensions);
    setTimeLimit(limit);
  }, [gameProgress.round]);

  useEffect(() => {
    // if the timer reaches the time limit it stops the game else the timer continues
    if (gameProgress.timer >= timeLimit && isGameRunning) {
      setGameProgress((prevProgress) => ({
        ...prevProgress,
        round: 1,
        timer: 0,
      }));
      setIsGameRunning(false);
    } else {
      timer();
    }
  }, [gameProgress.timer, timeLimit, isGameRunning]);

  const handleKeyPress = (event) => {
    if (isGameRunning && event.keyCode === 32) {
      // expands the circle by 5px every time space is pressed
      setCircleDimensions((prevDimensions) => {
        const { outerRadius, innerRadius } = prevDimensions;
        const newInnerRadius = innerRadius + 5;
        if (newInnerRadius >= outerRadius) {
          // if the innerRadius is equal to or greater than the outerRadius the game is over
          setGameProgress((prevProgress) => ({
            ...prevProgress,
            round: prevProgress.round + 1,
          }));
          setIsGameRunning(false);
        }
        return { ...prevDimensions, innerRadius: newInnerRadius };
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [isGameRunning]);

  const timer = () => {
    // if the game is running the timer increases by 1 every second else the timer is reset to 0
    if (isGameRunning) {
      setTimeout(() => {
        setGameProgress((prevProgress) => ({
          ...prevProgress,
          timer: prevProgress.timer + 1,
        }));
      }, 1000);
    } else {
      setGameProgress((prevProgress) => ({
        ...prevProgress,
        timer: 0,
      }));
    }
  };

  const startGame = () => {
    setGameProgress((prevProgress) => ({
      ...prevProgress,
      timer: 0,
    }));
    setIsGameRunning(true);
  };

  const startNextRound = () => {
    setGameProgress((prevProgress) => ({
      ...prevProgress,
      timer: 0,
    }));
    setIsGameRunning(true);
  };

  return (
    <>
      <Flex align="center" justify="center" direction="column" mt={5}>
        <Text>Round: {gameProgress.round}</Text>
        <Text>Timer: {gameProgress.timer}</Text>
        <Flex
          align="center"
          justify="center"
          direction="column"
          mt={180}
          pos="relative"
        >
          <Circle
            radius={circleDimensions.outerRadius}
            backgroundColor="transparent"
            borderColor="black"
          />
          <Circle
            radius={circleDimensions.innerRadius}
            backgroundColor="black"
            borderColor="black"
          />
        </Flex>
      </Flex>
      <Flex align="center" justify="center" direction="column" mt={180}>
        {!isGameRunning && gameProgress.round === 1 && (
          <Button onClick={startGame}>Start Game</Button>
        )}
        {!isGameRunning && gameProgress.round > 1 && (
          <Button onClick={startNextRound}>Next Round</Button>
        )}
      </Flex>
    </>
  );
};

export default TapMode;
