import {
  Flex,
  Text,
  Button,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import logo from "../Images/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={isMobile ? 3 : 5}
      py={1}
    >
      <Flex align="center">
        <Image src={logo} alt="RapidTap" boxSize={isMobile ? "60px" : "75px"} />
        <Text ml={2} fontSize={isMobile ? "sm" : "lg"}>
          {user ? `Welcome ${user.nickname}` : "Welcome Guest"}
        </Text>
      </Flex>
      {user ? (
        <Button size={isMobile ? "sm" : "md"} px={5} py={5} onClick={logOut}>
          Logout
        </Button>
      ) : (
        <NavLink to="/login">
          <Button size={isMobile ? "sm" : "md"} px={5} py={5}>
            Login
          </Button>
        </NavLink>
      )}
    </Flex>
  );
};

export default Navbar;
