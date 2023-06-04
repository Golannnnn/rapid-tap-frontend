import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  Input,
  Center,
  useToast,
} from "@chakra-ui/react";
import { TbArrowBadgeRight } from "react-icons/tb";
import userServices from "../services/users";

const Login = () => {
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.name || !loginData.password) {
      toast({
        title: "Oh, oh!",
        description: "Please fill in all fields.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      try {
        const response = await userServices.login(loginData);
        localStorage.setItem("token", response.token);
        toast({
          title: "Welcome back!",
          description: "Get ready to start tapping!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong, please try again.",
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
        Login
      </Heading>
      <Center>
        <Text fontSize="xs" textAlign="center">
          Tap, tap... we missed you!
        </Text>
      </Center>
      <Flex justify="center" align="center" direction="column" mt="100px">
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Nickname or email</Text>
            <FormControl m={3} className="glow-on-hover" w="300px">
              <Input type="text" name="name" onChange={handleInputChange} />
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
        <Button m={3} className="glow-on-hover" w="300px" onClick={handleLogin}>
          Login
        </Button>
        <TbArrowBadgeRight size="60px" className="arrow-badge" />
      </Flex>
    </Flex>
  );
};

export default Login;
