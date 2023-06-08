import { useState, useContext, useRef } from "react";
import { Flex, Heading, Text, Button, FormControl, Input, Center, Avatar, AvatarBadge, useBreakpointValue, Alert, AlertIcon, AlertDescription,} from "@chakra-ui/react";
import { TbArrowBadgeRight } from "react-icons/tb";
import { UserContext } from "../context/UserContext";
import { AiFillCamera } from "react-icons/ai";
import userServices from "../services/users";
import useToastService from "../hooks/useToastService";
import GoBack from "../components/GoBack";
import { ColorContext } from "../context/ColorContext";

//TODO: CHANGE TO MOBILE
//TODO: ADD TOASTS FOR EVERYTHING

const Settings = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { avatar, setAvatar } = useContext(ColorContext);
  const { user, updateUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    nickname: "",
    picture: "",
  });
  const [picture, setPicture] = useState(null);
  const hiddenFileInput = useRef(null);
  const { displayToast } = useToastService();
  const [fieldError, setFieldError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setAvatar(URL.createObjectURL(file));
  };

  const saveSettings = async (e) => {
    e.preventDefault();

    const userObject = new FormData();
    userObject.append("nickname", userData.nickname);
    userObject.append("picture", picture);

    if (
      (!userData.nickname && !picture) ||
      (userData.nickname === user.nickname && !picture) ||
      (!userData.nickname && picture === null)
    ) {
      setFieldError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await userServices.update(user.id, userObject);
      setFieldError(false);
      setLoginError(false);
      displayToast(
        "success",
        "Profile updated! Keep rocking and tapping! 👆🏻💥"
      );
      const newUpdatedUser = {
        nickname: userData.nickname ? userData.nickname : user.nickname,
      };
      updateUser(newUpdatedUser);
    } catch (error) {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center>
      <Flex justify="center" align="center" direction="column">
        <Flex justify={"center"} align="center" direction="column" mx={4}>
          <Heading
            my={5}
            fontSize={isMobile ? "2xl" : "3xl"}
            textAlign="center"
          >
            Settings
          </Heading>
          <Text fontSize="xs" align="center">
            Customize Your RapidTap Experience!
          </Text>
          <Text fontSize="xs" align="center" mb={isMobile ? 5 : 10}>
            Tapped it? Saved it? Now you can change it!
          </Text>
          <Avatar
            size={isMobile ? "xl" : "2xl"}
            name="nickname"
            src={picture ? URL.createObjectURL(picture) : user.picture}
            onClick={handleImageClick}
            input
            type="file"
          >
            <AvatarBadge
              boxSize="0.8em"
              borderWidth={0}
              borderColor="blue"
              bg="white"
              cursor="pointer"
              m={2}
            >
              <AiFillCamera
                style={{ objectFit: "cover", width: "70%", height: "70%" }}
              />
            </AvatarBadge>
          </Avatar>
          <input
            type="file"
            id="imageUpload"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </Flex>
        <Flex
          justify="center"
          align="center"
          direction="column"
          mt={isMobile ? "30px" : "50px"}
        >
          <Flex flexDirection="column">
            <Text ml={3}>Username or email</Text>
            <FormControl m={3} className="glow-on-hover" w="300px">
              <Input
                type="text"
                name="nickname"
                bg="rgb(232, 240, 254)"
                color="black"
                defaultValue={user.nickname}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>
          {fieldError && (
            <Alert
              status="error"
              textAlign="center"
              justify="center"
              width={isMobile && "300px"}
              my={3}
            >
              <AlertIcon size="40px" />
              <AlertDescription fontSize={isMobile ? "10px" : "12px"}>
                You need to change something to save your tappings! 🤔
              </AlertDescription>
            </Alert>
          )}
          {loginError && (
            <Alert
              status="error"
              textAlign="center"
              justify="center"
              width={isMobile && "300px"}
              my={3}
            >
              <AlertIcon size="40px" />
              <AlertDescription fontSize={isMobile ? "10px" : "12px"}>
                Profile update stuck in Rapid Tap chaos! Keep calm and try
                tapping again! ⚡️💥
              </AlertDescription>
            </Alert>
          )}
          <Flex position="relative">
            <Button
              m={3}
              className="glow-on-hover"
              w="300px"
              onClick={saveSettings}
              isLoading={loading}
            >
              Save
            </Button>
            {!isMobile && (
              <TbArrowBadgeRight size="60px" className="arrow-badge" />
            )}
          </Flex>
          <GoBack />
        </Flex>
      </Flex>
    </Center>
  );
};

export default Settings;
