import { Flex, Text, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={5}
      py={3}
      borderBottom="1px solid black"
    >
      <Text>{user ? `Welcome ${user.nickname}` : "Welcome Guest"}</Text>
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
