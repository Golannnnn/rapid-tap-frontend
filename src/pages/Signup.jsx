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

const Signup = () => {
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { login } = useContext(UserContext);
  const { displayToast } = useToastService();
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
        login(response.user);
        displayToast("success", "Account created. Get ready to start tapping!");
        setSignupError(false);
      } catch (error) {
        setSignupError(true);
      }
    }
  };

  return (
    <Flex justify={"center"} align="center" direction="column" mx={4} mb={10}>
      <Heading my={isMobile ? 2 : 5} fontSize="4xl">
        Signup
      </Heading>
      <Center>
        <Text fontSize="xs" textAlign="center">
          Sign up now for RapidTap, the game that pushes your reflexes to the
          limit.
        </Text>
      </Center>
      <Flex
        justify="center"
        align="center"
        direction="column"
        mt={isMobile ? "30px" : "50px"}
      >
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Email</Text>
            <FormControl
              m={3}
              className="glow-on-hover"
              bg="rgb(232, 240, 254)"
              color="black"
              borderColor="black"
              w="300px"
            >
              <Input type="email" name="email" onChange={handleInputChange} />
            </FormControl>
          </Flex>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Username</Text>
            <FormControl
              m={3}
              className="glow-on-hover"
              bg="rgb(232, 240, 254)"
              color="black"
              borderColor="black"
              w="300px"
            >
              <Input type="text" name="nickname" onChange={handleInputChange} />
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
              bg="rgb(232, 240, 254)"
              color="black"
              borderColor="black"
              w="300px"
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
        <Flex position="relative">
          <Flex flexDirection="column">
            <Text ml={3}>Repeat Password</Text>
            <FormControl
              m={3}
              className="glow-on-hover"
              bg="rgb(232, 240, 254)"
              color="black"
              borderColor="black"
              w="300px"
            >
              <Input
                type="password"
                onChange={handleInputChange}
                name="repeatPassword"
              />
            </FormControl>
          </Flex>
          <TbArrowBadgeRight size="60px" className="arrow-badge" />
        </Flex>
        {signupError && (
          <Alert status="error" textAlign="center" justify="center">
            <AlertIcon size="50px" />
            <AlertDescription fontSize={isMobile ? "15px" : "25px"}>
              Houston, we have a problem... Change your data and try again!
            </AlertDescription>
          </Alert>
        )}
        {passwordMatch && (
          <Alert status="error" textAlign="center" justify="center">
            <AlertIcon size="50px" />
            <AlertDescription fontSize={isMobile ? "15px" : "25px"}>
              Passwords don't match or data missing.
            </AlertDescription>
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
        <Text fontSize="xs" textAlign="center" mt={3}>
          Have an account?{" "}
          <NavLink to="/login" className="link" style={{ color: "blue" }}>
            Login
          </NavLink>
        </Text>
        <TbArrowBadgeRight size="60px" className="arrow-badge" />
      </Flex>
      <Flex mt={5}>
        <GoBack />
      </Flex>
    </Flex>
  );
};

export default Signup;
