import { Flex, Box, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const MobileDesktop = () => {
  const circleStyle = {
    width: "300px",
    height: "50px",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  return (
    <Flex align="center" justify="center" direction="column">
      <Text textAlign="center" fontSize="2xl" fontWeight="bold" mt={20} mb={5}>
        Choose your device:
      </Text>
      <NavLink to="/tapmode">
        <Box style={circleStyle} mt={10} mb={10} className="glow-on-hover">
          <Text align="center">Desktop</Text>
        </Box>
      </NavLink>
      <NavLink to="/clickmode">
        <Box style={circleStyle} className="glow-on-hover">
          <Text align="center">Mobile</Text>
        </Box>
      </NavLink>
    </Flex>
  );
};

export default MobileDesktop;
