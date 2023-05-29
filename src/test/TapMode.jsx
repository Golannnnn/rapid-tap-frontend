import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";

const Game = () => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  const handleKeyDown = (event) => {
    if (dimensions.width === 400 && dimensions.height === 400) {
      alert("You win!");
      return;
    }
    if (event.code === "Space") {
      setDimensions((prevDimensions) => ({
        width: prevDimensions.width + 10,
        height: prevDimensions.height + 10,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyDown);
    return () => {
      document.removeEventListener("keyup", handleKeyDown);
    };
  }, [dimensions]);

  return (
    <Center mt={200}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          height: "400px",
          border: "1px solid black",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: "red",
            borderRadius: "50%",
          }}
        ></div>
      </div>
    </Center>
  );
};

export default Game;
