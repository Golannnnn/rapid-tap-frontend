/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Circle = ({
  radius,
  backgroundColor,
  borderColor,
  startGame,
  isGameRunning,
}) => {
  const [countDown, setCountDown] = useState(3);
  const [canClick, setCanClick] = useState(true);

  const handleClick = () => {
    if (!isGameRunning && countDown === 3 && canClick) {
      setCanClick(false);
      startCountdown();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = (e) => {
    if (e.code === "Space" && !isGameRunning && countDown === 3 && canClick) {
      setCanClick(false);
      startCountdown();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyDown);
    return () => {
      document.removeEventListener("keyup", handleKeyDown);
    };
  }, [handleKeyDown]);

  const startCountdown = () => {
    let timerId = setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      setCountDown(3);
      setCanClick(true);
      if (!isGameRunning) {
        startGame();
      }
    }, 4000);
  };

  const circleStyle = {
    position: "absolute",
    width: radius * 2,
    height: radius * 2,
    borderRadius: "50%",
    backgroundColor: backgroundColor,
    border: `2px solid ${borderColor}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    cursor: isGameRunning ? "default" : "pointer",
  };

  return (
    <div style={circleStyle} onClick={handleClick}>
      {!isGameRunning && canClick && "Tap"}
      {!isGameRunning && !canClick && countDown > 0 && countDown}
      {!isGameRunning && countDown === 0 && "Go!"}
    </div>
  );
};

export default Circle;
