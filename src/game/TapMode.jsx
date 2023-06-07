import { useState, useEffect } from "react";
import Circle from "./Circle";
import { Flex, Text, Button } from "@chakra-ui/react";
import GameOver from "../components/GameOver";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { UserContext } from "../context/UserContext";
import scoreService from "../services/scores";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import levels from "./levels";
import { SoundContext } from "../context/SoundContext";

const TapMode = () => {
  const [circleDimensions, setCircleDimensions] = useState({
    outerRadius: 170,
    innerRadius: 50,
  });
  const [gameProgress, setGameProgress] = useState({
    round: 1,
    timer: 5,
  });
  const [timeLimit, setTimeLimit] = useState(5);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSpacebarPressed, setIsSpacebarPressed] = useState(false);
  const { width, height } = useWindowSize();
  const [nextRound, setNextRound] = useState(false);
  const { user } = useContext(UserContext);
  const { succesSound, clickSound, loseSound } = useContext(SoundContext);

  useEffect(() => {
    const calculateDimensions = () => {
      // outerRadius is increasing by 10 every round and starts at 100
      const outerRadius = levels[gameProgress.round - 1].outerCircleRadius;
      // innerRadius is decreasing by 5 every round and starts at 50
      const innerRadius = levels[gameProgress.round - 1].innerCircleRadius;
      return { outerRadius, innerRadius };
    };

    const dimensions = calculateDimensions(gameProgress.round);

    setCircleDimensions(dimensions);
  }, [gameProgress.round]);

  useEffect(() => {
    // if the timer reaches the time limit it stops the game else the timer continues
    if (gameProgress.timer <= 0 && isGameRunning) {
      setGameProgress({
        round: 1,
        timer: 5,
      });
      setIsGameRunning(false);
      setIsGameOver(true);
      loseSound();
      setCircleDimensions({
        outerRadius: 170,
        innerRadius: 50,
      });
    }
  }, [gameProgress.timer, timeLimit, isGameRunning]);

  const handleKeyPress = (event) => {
    if (isGameRunning && event.code === "Space" && !isSpacebarPressed) {
      setIsSpacebarPressed(true);
      clickSound();
      // expands the circle by 5px every time space is pressed
      setCircleDimensions((prevDimensions) => {
        const { outerRadius, innerRadius } = prevDimensions;
        const newInnerRadius =
          innerRadius + levels[gameProgress.round - 1].circleSizeIncrease;
        if (newInnerRadius >= outerRadius) {
          // if the innerRadius is equal to or greater than the outerRadius the game is over
          setGameProgress((prevProgress) => ({
            ...prevProgress,
            round: gameProgress.round + 1,
          }));
          succesSound();
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
    await scoreService.addScore(user.id, newScore);
  };

  const resetGame = () => {
    setGameProgress({ round: 1, timer: timeLimit });
    setIsGameRunning(false);
    setIsGameOver(false);
    setCircleDimensions({ outerRadius: 170, innerRadius: 50 });
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
          mt={220}
          pos="relative"
        >
          {!isGameRunning &&
          !isGameOver &&
          gameProgress.round > 1 &&
          !nextRound ? (
            <>
              {/** delay the show of button for 1 second */}
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
