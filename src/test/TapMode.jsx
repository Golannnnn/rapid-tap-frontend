import { useState, useEffect } from "react";
import Circle from "./Circle";
import { Flex, Text, Heading, Button } from "@chakra-ui/react";

const TapMode = () => {
  const [circleDimensions, setCircleDimensions] = useState({
    outerRadius: 100,
    innerRadius: 50,
  });
  const [timeLimit, setTimeLimit] = useState(10);
  const [gameProgress, setGameProgress] = useState({
    round: 1,
    timer: timeLimit,
  });
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
      return 11 - gameProgress.round;
    };

    const dimensions = calculateDimensions(gameProgress.round);
    const limit = calculateTimeLimit();

    setCircleDimensions(dimensions);
    setTimeLimit(limit);
  }, [gameProgress.round]);

  useEffect(() => {
    // if the timer reaches the time limit it stops the game else the timer continues
    if (gameProgress.timer <= 0 && isGameRunning) {
      setGameProgress({
        round: 1,
        timer: timeLimit,
      });
      setIsGameRunning(false);
      setCircleDimensions({
        outerRadius: 100,
        innerRadius: 50,
      });
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
            round: gameProgress.round + 1,
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
          timer: prevProgress.timer - 1,
        }));
      }, 1000);
    } else {
      setGameProgress((prevProgress) => ({
        ...prevProgress,
        timer: timeLimit,
      }));
    }
  };

  const startGame = () => {
    setGameProgress((prevProgress) => ({
      ...prevProgress,
      timer: timeLimit,
    }));
    setIsGameRunning(true);
  };

  const startNextRound = () => {
    setGameProgress((prevProgress) => ({
      ...prevProgress,
      timer: timeLimit,
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
            startGame={startGame}
            startNextRound={startNextRound}
            isGameRunning={isGameRunning}
            smallCircle={false}
          />
          {/* <Flex
            align="center"
            justify="center"
            direction="column"
            zIndex={999}
            position="absolute"
          > */}
          {/* {!isGameRunning && gameProgress.round === 1 && (
              <Button className="game-button" onClick={startGame}>
                Start Game
              </Button>
            )}
            {!isGameRunning && gameProgress.round > 1 && (
              <Button className="game-button" onClick={startNextRound}>
                Next Round
              </Button>
            )} */}
          {/* </Flex> */}
          <Circle
            radius={circleDimensions.innerRadius}
            backgroundColor="black"
            borderColor="black"
            startGame={startGame}
            startNextRound={startNextRound}
            isGameRunning={isGameRunning}
            smallCircle={true}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default TapMode;
