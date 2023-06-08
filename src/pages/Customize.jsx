import React, { useContext } from 'react';
import { useState } from 'react';
import { Flex, Heading, Text, Box, Avatar, Button } from '@chakra-ui/react';
import { ColorContext } from '../context/ColorContext';
import GoBack from '../components/GoBack';
import useToastService from "../hooks/useToastService";

const Customize = () => {
  const { displayToast } = useToastService();
  const { color, setColor, avatar, isAvatarClicked, setIsAvatarClicked } = useContext(ColorContext);
  const [chosenColor, setChosenColor] = useState(color);

  const saveColor = () => {
    const updatedColor = isAvatarClicked ? avatar : chosenColor;
    setColor(updatedColor);
  
    displayToast("success", "Get tapping with your new color!");
  };
  
  const outerCircleStyle = {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: `2px solid ${isAvatarClicked ? 'black' : chosenColor}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const innerCircleStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: chosenColor,
    backgroundImage: isAvatarClicked ? `url(${avatar})` : 'none',
    backgroundSize: isAvatarClicked ? 'contain' : 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const circleStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };
 
  return (
    <Flex align="flex" justify="center" direction="column">
      <Heading textAlign="center" my={5} fontSize="4xl">
        Choose Your Color
      </Heading>
      <Text align="center" fontSize="xs">
        Here you can customize how your circle looks.
      </Text>
      <Text align="center" fontSize="xs">
        Choose from a variety of colors to make your circle unique! Or use your
        own avatar!
      </Text>
      <Flex direction="row" align="center" justify="space-around" mt="100px">
        <Flex direction="column" align="center">
          <Box style={outerCircleStyle}>
            <Box style={innerCircleStyle}></Box>
          </Box>
          <Button className='glow-on-hover' onClick={() => saveColor()} mt={6}>
            Save!
          </Button>
        </Flex>
        <Flex direction="column" ml="30px">
          <Flex direction="row" wrap="wrap" justify="center">
            <Box m="10px" style={circleStyle} bg={'black'} onClick={() => {setChosenColor('black'); setIsAvatarClicked(false)}}></Box>
            <Box m="10px" style={circleStyle} bg={'#FF4848'} onClick={() => {setChosenColor('#FF4848'); setIsAvatarClicked(false)}}></Box>
            <Box m="10px" style={circleStyle} bg={'#FF9551'} onClick={() => {setChosenColor('#FF9551'); setIsAvatarClicked(false)}}></Box>
          </Flex>
          <Flex direction="row" wrap="wrap" justify="center">
            <Box m="10px" style={circleStyle} bg={'#FFD966'} onClick={() => {setChosenColor('#FFD966'); setIsAvatarClicked(false)}}></Box>
            <Box m="10px" style={circleStyle} bg={'#9CFF2E'} onClick={() => {setChosenColor('#9CFF2E'); setIsAvatarClicked(false)}}></Box>
            <Box m="10px" style={circleStyle} bg={'#31E1F7'} onClick={() => {setChosenColor('#31E1F7'); setIsAvatarClicked(false)}}></Box>
          </Flex>
          <Flex direction="row" wrap="wrap" justify="center">
            <Box m="10px" style={circleStyle} bg={'#9336B4'} onClick={() => {setChosenColor('#9336B4'); setIsAvatarClicked(false)}}></Box>
            <Box m="10px" style={circleStyle} bg={'#FF55BB'} onClick={() => {setChosenColor('#FF55BB'); setIsAvatarClicked(false)}}></Box>
            <Box m="10px" style={circleStyle} bg={'#AA5656'} onClick={() => {setChosenColor('#AA5656'); setIsAvatarClicked(false)}}></Box>
          </Flex>
          <Flex direction="row" wrap="wrap" justify="center">
            <Avatar m='10px' style={circleStyle} src={avatar} onClick={() => {setIsAvatarClicked(true);setChosenColor(avatar);}}></Avatar>
          </Flex>
        </Flex>
      </Flex>
      <GoBack />
    </Flex>
  );
};

export default Customize;
