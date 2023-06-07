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
import BackgroundMusic from "./BackgroundMusic";
import { SoundContext } from "../context/SoundContext";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { sound, toggleSound } = useContext(SoundContext);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={isMobile ? 3 : 5}
      py={1}
    >
      <Flex align="center">
        <NavLink to="/">
          <Image
            src={logo}
            alt="RapidTap"
            boxSize={isMobile ? "60px" : "75px"}
          />
        </NavLink>
        {!isMobile && (
          <Text ml={2} fontSize="lg">
            {user ? `Welcome ${user.nickname}` : "Welcome Guest"}
          </Text>
        )}
      </Flex>
      <Flex align="center" justify="center" gap={5}>
        {sound ? (
          <HiSpeakerWave
            size={isMobile ? "30px" : "40px"}
            onClick={toggleSound}
            cursor="pointer"
          />
        ) : (
          <HiSpeakerXMark
            size={isMobile ? "30px" : "40px"}
            onClick={toggleSound}
            cursor="pointer"
          />
        )}
        <BackgroundMusic />
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
    </Flex>
  );
};

export default Navbar;
