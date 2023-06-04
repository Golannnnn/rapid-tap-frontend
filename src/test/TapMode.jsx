import { useState, useEffect } from "react";
import Circle from "./Circle";

const Game = () => {
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(0);
  const [circleDimensions, setCircleDimensions] = useState({
    outerRadius: 100,
    innerRadius: 50,
  });
  const [timeLimit, setTimeLimit] = useState(10); // Initial time limit in seconds
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    // Update circle dimensions and time limit based on the round number
    const calculateDimensions = (round) => {
      // Calculate dimensions using an algorithm of your choice
      const outerRadius = 100 + round * 10;
      const innerRadius = outerRadius / 2;
      return { outerRadius, innerRadius };
    };

    const calculateTimeLimit = (round) => {
      // Calculate time limit using an algorithm of your choice
      return 10 + round * 2; // Increase time limit by 2 seconds per round
    };

    const dimensions = calculateDimensions(round);
    const limit = calculateTimeLimit(round);

    setCircleDimensions(dimensions);
    setTimeLimit(limit);
    setTimer(0); // Reset the timer
  }, [round]);

  const startGame = () => {
    setRound(1);
    setTimer(0);
    setIsGameRunning(true);
  };

  const handleKeyPress = (event) => {
    if (isGameRunning && event.keyCode === 32) {
      // Expand the inner circle
      setCircleDimensions((prevDimensions) => {
        const { outerRadius, innerRadius } = prevDimensions;
        const newInnerRadius = innerRadius + 5;
        if (newInnerRadius >= outerRadius) {
          // Inner circle filled the outer circle, round completed
          setRound((prevRound) => prevRound + 1);
          setIsGameRunning(false);
        }
        return { ...prevDimensions, innerRadius: newInnerRadius };
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isGameRunning]);

  useEffect(() => {
    let interval;
    if (isGameRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isGameRunning]);

  useEffect(() => {
    if (timer >= timeLimit) {
      // Round failed, reset the game
      setRound(1);
      setTimer(0);
      setIsGameRunning(false);
    }
  }, [timer, timeLimit]);

  return (
    <div>
      <div>Round: {round}</div>
      <div>Timer: {timer}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginTop: 150,
        }}
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
      </div>
      {!isGameRunning && <button onClick={startGame}>Start Game</button>}
    </div>
  );
};

export default Game;
