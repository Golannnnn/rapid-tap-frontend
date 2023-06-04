import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  Input,
  Center,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { TbArrowBadgeRight } from "react-icons/tb";
import userServices from "../services/users";

const Signup = () => {
  const [passwordMatch, setPasswordMatch] = useState(false);
  const toast = useToast();
  const [signUpData, setSignUpData] = useState({
    email: "",
    nickname: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (
      signUpData.password !== signUpData.repeatPassword ||
      !signUpData.email ||
      !signUpData.nickname ||
      !signUpData.password ||
      !signUpData.repeatPassword
    ) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
      try {
        const userObject = {
          email: signUpData.email,
          nickname: signUpData.nickname,
          password: signUpData.password,
        };
        const response = await userServices.signup(userObject);
        localStorage.setItem("token", response.token);
        toast({
          title: "Account created.",
          description: "Get ready to start tapping!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Houston, we have a problem...",
          description: "Wrong email or password.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex justify={"center"} align="center" direction="column" mx={4}>
      <Heading my={5} fontSize="4xl">
        Signup
      </Heading>
      <Center>
        <Text fontSize="xs" textAlign="center">
          Sign up now for Speed Tapper, the game that pushes your reflexes to
          the limit.
        </Text>
      </Center>
      <Flex justify="center" align="center" direction="column" mt="100px">
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Email</Text>
            <FormControl m={3} className="glow-on-hover" w="300px">
              <Input type="email" name="email" onChange={handleInputChange} />
            </FormControl>
          </Flex>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Nickname</Text>
            <FormControl m={3} className="glow-on-hover" w="300px">
              <Input type="text" name="nickname" onChange={handleInputChange} />
            </FormControl>
          </Flex>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Password</Text>
            <FormControl m={3} className="glow-on-hover" w="300px">
              <Input
                type="password"
                password="password"
                onChange={handleInputChange}
                name="password"
              />
            </FormControl>
          </Flex>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Repeat Password</Text>
            <FormControl m={3} className="glow-on-hover" w="300px">
              <Input
                type="password"
                onChange={handleInputChange}
                name="repeatPassword"
              />
            </FormControl>
          </Flex>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        {passwordMatch && (
          <Alert status="error" textAlign="center" justify="center">
            <AlertIcon size="50px" />
            Passwords don't match or data missing.
          </Alert>
        )}
        <Button
          m={3}
          className="glow-on-hover"
          w="300px"
          onClick={handleCreateAccount}
        >
          Create account
        </Button>
        <TbArrowBadgeRight size="60px" className="arrow-badge" />
      </Flex>
    </Flex>
  );
};

export default Signup;
