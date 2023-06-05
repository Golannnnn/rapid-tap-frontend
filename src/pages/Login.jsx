import { useState, useContext } from "react";
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
  AlertDescription,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TbArrowBadgeRight } from "react-icons/tb";
import userServices from "../services/users";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useToastService from "../hooks/useToastService";
import GoBack from "../components/GoBack";

const Login = () => {
  const [fieldError, setFieldError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const { login } = useContext(UserContext);
  const { displayToast } = useToastService();
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
        displayToast("success", "Welcome back! Get ready to start tapping!");
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
            <Text ml={3}>Username or email</Text>
            <FormControl
              m={3}
              className="glow-on-hover"
              w="300px"
              bg="rgb(232, 240, 254)"
              color="black"
              borderColor="black"
            >
              <Input type="text" name="name" onChange={handleInputChange} />
            </FormControl>
          </Flex>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Password</Text>
            <FormControl
              m={3}
              className="glow-on-hover"
              w="300px"
              bg="rgb(232, 240, 254)"
              color="black"
              borderColor="black"
            >
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
      <Flex mt={5}>
        <GoBack />
      </Flex>
    </Flex>
  );
};

export default Login;
