import React from 'react';
import { useState } from 'react';
import { Flex, Heading, Text, Box, Avatar } from '@chakra-ui/react';

const Customize = () => {
  const [color, setColor] = useState('black');
  const outerCircleStyle = {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: `2px solid ${color}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const innerCircleStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: color,
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
        <Box style={outerCircleStyle}>
          <Box style={innerCircleStyle}></Box>
        </Box>
        <Flex direction="column" ml="30px">
          <Flex direction="row" wrap="wrap" justify="center">
            <Box m="10px" style={circleStyle} bg={'black'} onClick={() => setColor('black')}></Box>
            <Box m="10px" style={circleStyle} bg={'red'} onClick={() => setColor('red')}></Box>
            <Box m="10px" style={circleStyle} bg={'orange'} onClick={() => setColor('orange')}></Box>
          </Flex>
          <Flex direction="row" wrap="wrap" justify="center">
            <Box m="10px" style={circleStyle} bg={'yellow'} onClick={() => setColor('yellow')}></Box>
            <Box m="10px" style={circleStyle} bg={'green'} onClick={() => setColor('green')}></Box>
            <Box m="10px" style={circleStyle} bg={'blue'} onClick={() => setColor('blue')}></Box>
          </Flex>
          <Flex direction="row" wrap="wrap" justify="center">
            <Box m="10px" style={circleStyle} bg={'purple'} onClick={() => setColor('purple')}></Box>
            <Box m="10px" style={circleStyle} bg={'pink'} onClick={() => setColor('pink')}></Box>
            <Box m="10px" style={circleStyle} bg={'brown'} onClick={() => setColor('brown')}></Box>
          </Flex>
          <Flex direction="row" wrap="wrap" justify="center">
            <Avatar m='10px' style={circleStyle} onClick={() => setColor('brown')}></Avatar>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Customize;
