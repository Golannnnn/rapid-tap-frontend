import { Flex, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const GoBack = () => {
  return (
    <Flex justify="center" align="center" direction="column" mx={4}>
      <NavLink to="/">
        <Button m={3} className="glow-on-hover">
          Main Menu
        </Button>
      </NavLink>
    </Flex>
  );
};
export default GoBack;
