import { useState, useEffect } from "react";
import Circle from "./Circle";
import { Flex, Text, Button } from "@chakra-ui/react";
import GoBack from "../components/GoBack";
import GameOver from "../components/GameOver";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { UserContext } from "../context/UserContext";
import scoreService from "../services/scores";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import levels from "./levels";

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
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSpacebarPressed, setIsSpacebarPressed] = useState(false);
  const { width, height } = useWindowSize();
  const [nextRound, setNextRound] = useState(false);
  const { user } = useContext(UserContext);
  console.log(levels[gameProgress.round - 1].round);

  useEffect(() => {
    const calculateDimensions = (round) => {
      // outerRadius is increasing by 10 every round and starts at 100
      const outerRadius = 100;
      // innerRadius is decreasing by 5 every round and starts at 50
      const innerRadius = 50;
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
      setIsGameOver(true);
      setCircleDimensions({
        outerRadius: 100,
        innerRadius: 50,
      });
    }
  }, [gameProgress.timer, timeLimit, isGameRunning]);

  const handleKeyPress = (event) => {
    if (isGameRunning && event.code === "Space" && !isSpacebarPressed) {
      setIsSpacebarPressed(true);
      // expands the circle by 5px every time space is pressed
      setCircleDimensions((prevDimensions) => {
        const { outerRadius, innerRadius } = prevDimensions;
        const newInnerRadius =
          innerRadius + levels[gameProgress.round - 1].sizeincrease;
        if (newInnerRadius >= outerRadius) {
          // if the innerRadius is equal to or greater than the outerRadius the game is over
          setGameProgress((prevProgress) => ({
            ...prevProgress,
            round: gameProgress.round + 1,
          }));
          setIsGameRunning(false);
          setNextRound(false);
          saveScore();
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

  useEffect(() => {
    let timerId;

    if (isGameRunning) {
      timerId = setInterval(() => {
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

    return () => {
      clearInterval(timerId);
    };
  }, [isGameRunning, timeLimit, gameProgress.timer]);

  const startGame = () => {
    setIsSpacebarPressed(false);
    setGameProgress((prevProgress) => ({
      ...prevProgress,
      timer: timeLimit,
    }));
    setIsGameRunning(true);
    setIsGameOver(false);
  };

  const startNextRound = () => {
    setNextRound(true);
  };

  const saveScore = async () => {
    const newScore = {
      score: gameProgress.round,
    };
    const response = await scoreService.addScore(user.id, newScore);
    console.log(response);
  };
  const resetGame = () => {
    setGameProgress({ round: 1, timer: timeLimit });
    setIsGameRunning(false);
    setIsGameOver(false);
    setCircleDimensions({ outerRadius: 100, innerRadius: 50 });
  };

  return (
    <>
      <Flex align="center" justify="center" direction="column" mt={5}>
        {!isGameOver && (
          <>
            <Text>Round: {gameProgress.round}</Text>
            <Text>Timer: {gameProgress.timer}</Text>
          </>
        )}
        <Flex
          align="center"
          justify="center"
          direction="column"
          mt={180}
          pos="relative"
        >
          {!isGameRunning &&
          !isGameOver &&
          gameProgress.round > 1 &&
          !nextRound ? (
            <>
              <Button onClick={startNextRound} colorScheme="blue">
                Start Round {gameProgress.round}
              </Button>
              <NavLink to="/">
                <Button m={3} className="glow-on-hover" w={"192px"}>
                  Main Menu
                </Button>
              </NavLink>
            </>
          ) : (
            <>
              {!isGameOver && (
                <>
                  <Circle
                    radius={circleDimensions.outerRadius}
                    backgroundColor="transparent"
                    borderColor="black"
                    startGame={startGame}
                    isGameRunning={isGameRunning}
                    smallCircle={false}
                  />
                  <Circle
                    radius={circleDimensions.innerRadius}
                    backgroundColor="black"
                    borderColor="black"
                    startGame={startGame}
                    isGameRunning={isGameRunning}
                    smallCircle={true}
                  />
                </>
              )}
            </>
          )}
          {isGameOver && (
            <>
              <GameOver />
              <Button m={3} className="glow-on-hover" onClick={resetGame}>
                Play Again
              </Button>
              <NavLink to="/highscores">
                <Button m={3} className="glow-on-hover">
                  Highscores
                </Button>
              </NavLink>
              <NavLink to="/">
                <Button m={3} className="glow-on-hover" w={"192px"}>
                  Main Menu
                </Button>
              </NavLink>
            </>
          )}
        </Flex>
      </Flex>
      {!isGameRunning &&
        !isGameOver &&
        gameProgress.round > 1 &&
        !nextRound && <Confetti width={width} height={height} />}
    </>
  );
};

export default TapMode;
