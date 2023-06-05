import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import logo from "../Images/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={5}
      py={1}
      // borderBottom="1px solid black"
      // bg="rgba(255, 255, 255, 0.9)"
    >
      <Flex align="center">
        <Image src={logo} alt="RapidTap" boxSize="75px" />
        <Text ml={2}>
          {user ? `Welcome ${user.nickname}` : "Welcome Guest"}
        </Text>
      </Flex>
      {user ? (
        <Button onClick={logOut}>Logout</Button>
      ) : (
        <NavLink to="/login">
          <Button>Login</Button>
        </NavLink>
      )}
    </Flex>
  );
};

export default Navbar;
