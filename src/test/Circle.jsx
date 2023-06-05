// eslint-disable-next-line react/prop-types
const Circle = ({ radius, backgroundColor, borderColor }) => {
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
  };

  return <div style={circleStyle}></div>;
};

export default Circle;
