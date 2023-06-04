import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const Signup = () => {
  return (
    <Flex justify="center" align="center" direction="column">
      <Heading my={5} fontSize="4xl">
        RapidTap
      </Heading>
      <Heading my={5} fontSize="4xl">
        Signup
      </Heading>
      <Text fontSize="xs">
        Sign up now for Speed Tapper, the game that pushes your reflexes to the
        limit.
      </Text>
      <Text fontSize="xs">Tap, race, and conquer 100 levels.</Text>
      <Flex justify="center" align="center" direction="column" mt="150px">
        <Flex position="relative">
          <FormControl m={3} className="glow-on-hover" w="300px">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <Button m={3} className="glow-on-hover" w="300px">
            Play!
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Button m={3} className="glow-on-hover" w="300px">
            Login
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Button m={3} className="glow-on-hover" w="300px">
            Highscores
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Button m={3} className="glow-on-hover" w="300px">
            Settings
          </Button>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
