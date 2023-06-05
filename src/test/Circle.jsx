/* eslint-disable react/prop-types */
const Circle = ({
  radius,
  backgroundColor,
  borderColor,
  startGame,
  startNextRound,
  isGameRunning,
  smallCircle,
}) => {
  const handleClick = () => {
    if (!isGameRunning) {
      startGame();
    }
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
    cursor: !isGameRunning ? "pointer" : "default",
  };

  return (
    <div style={circleStyle} onClick={handleClick}>
      {!isGameRunning && "Go!"}
    </div>
  );
};

export default Circle;
