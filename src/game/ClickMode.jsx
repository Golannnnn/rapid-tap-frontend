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
import { SoundContext } from "../context/SoundContext";
import { ColorContext } from "../context/ColorContext";

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
  const [delayButtons, setDelayButtons] = useState(true);
  const { user } = useContext(UserContext);
  const { succesSound, clickSound, loseSound } = useContext(SoundContext);
  const { color } = useContext(ColorContext);

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
      loseSound();
      setGameProgress({
        round: 1,
        timer: 5,
      });
      setIsGameRunning(false);
      setIsGameOver(true);
      setCircleDimensions({
        outerRadius: 170,
        innerRadius: 50,
      });
      setTimeout(() => {
        setDelayButtons(false);
      }, 1000);
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
            innerRadius + levels[gameProgress.round - 1].circleSizeIncrease;
          if (newInnerRadius >= outerRadius) {
            setGameProgress((prevProgress) => ({
              ...prevProgress,
              round: gameProgress.round + 1,
            }));
            succesSound();
            setIsGameRunning(false);
            setNextRound(false);
            saveScore();
            setTimeout(() => {
              setDelayButtons(false);
            }, 500);
          }
          return { ...prevDimensions, innerRadius: newInnerRadius };
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("touchend", handleKeyPress);

    return () => {
      document.removeEventListener("touchend", handleKeyPress);
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
    setDelayButtons(true);
  };

  const startNextRound = () => {
    setNextRound(true);
    setDelayButtons(true);
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
    setDelayButtons(true);
  };

  return (
    <>
      <Flex align="center" justify="center" direction="column" mt={3}>
        {!isGameOver && (
          <Flex w="100%" justify="space-between" px={10} mb={5}>
            <Text mr={10}>Round:{gameProgress.round}</Text>
            <Text>Timer:{gameProgress.timer}</Text>
          </Flex>
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
              {!delayButtons && (
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
              )}
            </Flex>
          ) : (
            <>
              {!isGameOver && (
                <>
                  <ClickCircle
                    radius={circleDimensions.outerRadius}
                    backgroundColor="transparent"
                    borderColor={color}
                    startGame={startGame}
                    isGameRunning={isGameRunning}
                    smallCircle={false}
                    round={gameProgress.round}
                  />
                  <ClickCircle
                    radius={circleDimensions.innerRadius}
                    backgroundColor={color}
                    borderColor={color}
                    startGame={startGame}
                    isGameRunning={isGameRunning}
                    smallCircle={true}
                    round={gameProgress.round}
                  />
                </>
              )}
            </>
          )}
          {isGameOver && (
            <>
              <GameOver />
              {!delayButtons && (
                <>
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
