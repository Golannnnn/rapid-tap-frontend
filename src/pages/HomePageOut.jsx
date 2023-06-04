import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { TbArrowBadgeRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const HomePageOut = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" direction="column">
      <Flex justify={"center"} align="center" direction="column" mx={4}>
        <Heading my={5} fontSize="4xl" textAlign="center">
          RapidTap
        </Heading>
        <Text fontSize="xs" align="center">
          Tap as fast as you can to fill the circle before time runs out!
        </Text>
        <Text fontSize="xs" align="center">
          Login to save your score or play without saving!
        </Text>
      </Flex>
      <Flex justify="center" align="center" direction="column" mt="150px">
        <Flex position="relative">
          <Button
            m={3}
            className="glow-on-hover"
            w="300px"
            onClick={() => {
              navigate("/");
            }}
          >
            Play!
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Button
            m={3}
            className="glow-on-hover"
            w="300px"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Button
            m={3}
            className="glow-on-hover"
            w="300px"
            onClick={() => {
              navigate("/highscores");
            }}
          >
            Highscores
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Button
            m={3}
            className="glow-on-hover"
            w="300px"
            onClick={() => {
              navigate("/settings");
            }}
          >
            Settings
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePageOut;
