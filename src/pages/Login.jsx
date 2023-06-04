import { useState, useContext } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  Input,
  Center,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TbArrowBadgeRight } from "react-icons/tb";
import userServices from "../services/users";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [fieldError, setFieldError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const { login } = useContext(userContext);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.name || !loginData.password) {
      setFieldError(true);
    } else {
      try {
        setFieldError(false);
        const response = await userServices.login(loginData);
        localStorage.setItem("token", response.token);
        login(response.user);
        toast({
          title: "Welcome back!",
          description: "Get ready to start tapping!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        setLoginError(true);
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
      <Flex
        justify="center"
        align="center"
        direction="column"
        mt={isMobile ? "30px" : "100px"}
      >
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
        {fieldError && (
          <Alert status="error" textAlign="center" justify="center">
            <AlertIcon size="50px" />
            <AlertDescription fontSize={isMobile ? "15px" : "25px"}>
              Uh, oh... Please fill in all the fields
            </AlertDescription>
          </Alert>
        )}
        {loginError && (
          <Alert status="error" textAlign="center" justify="center">
            <AlertIcon size="50px" />
            {/* <AlertTitle>Uh, oh...</AlertTitle> */}
            <AlertDescription fontSize={isMobile ? "15px" : "25px"}>
              Uh, oh... Wrong email or password
            </AlertDescription>
          </Alert>
        )}
        <Button m={3} className="glow-on-hover" w="300px" onClick={handleLogin}>
          Login
        </Button>
        <Text fontSize="xs" textAlign="center" mt={3}>
          Don't have an account?{" "}
          <NavLink to="/signup" className="link" style={{ color: "blue" }}>
            Sign up
          </NavLink>
        </Text>
        <TbArrowBadgeRight size="40px" className="arrow-badge" />
      </Flex>
    </Flex>
  );
};

export default Login;
