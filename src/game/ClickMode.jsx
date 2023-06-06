import { useState, useEffect } from "react";
import ClickCircle from "./ClickCircle";
import { Flex, Text, Button } from "@chakra-ui/react";
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
  const [gameProgress, setGameProgress] = useState({
    round: 1,
    timer: levels[0].timelimit,
  });
  const [timeLimit, setTimeLimit] = useState(levels[0].timelimit);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSpacebarPressed, setIsSpacebarPressed] = useState(false);
  const { width, height } = useWindowSize();
  const [nextRound, setNextRound] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const calculateDimensions = () => {
      // outerRadius is increasing by 10 every round and starts at 100
      const outerRadius = 100;
      // innerRadius is decreasing by 5 every round and starts at 50
      const innerRadius = 50;
      return { outerRadius, innerRadius };
    };

    const calculateTimeLimit = () => {
      // decreases by 1 every round and starts at 10
      return levels[gameProgress.round - 1].timelimit;
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
    if (isGameRunning && !isSpacebarPressed) {
      const { outerRadius, innerRadius } = circleDimensions;
      const { target } = event;
      if (
        target.classList.contains("circle") &&
        target.offsetWidth / 2 >= innerRadius &&
        target.offsetWidth / 2 <= outerRadius
      ) {
        setIsSpacebarPressed(true);
        setCircleDimensions((prevDimensions) => {
          const { outerRadius, innerRadius } = prevDimensions;
          const newInnerRadius =
            innerRadius + levels[gameProgress.round - 1].sizeincrease;
          if (newInnerRadius >= outerRadius) {
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
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleKeyPress);
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
    await scoreService.addScore(user.id, newScore);
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
            <Flex align="center" justify="center" direction="column" mt={180}>
              <Button onClick={startNextRound} colorScheme="blue">
                Start Round {gameProgress.round}
              </Button>
              <NavLink to="/">
                <Button m={3} className="glow-on-hover" w={"192px"}>
                  Main Menu
                </Button>
              </NavLink>
            </Flex>
          ) : (
            <>
              {!isGameOver && (
                <>
                  <ClickCircle
                    radius={circleDimensions.outerRadius}
                    backgroundColor="transparent"
                    borderColor="black"
                    startGame={startGame}
                    isGameRunning={isGameRunning}
                    smallCircle={false}
                  />
                  <ClickCircle
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
