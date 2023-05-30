import React from "react";
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { TbArrowBadgeRight } from 'react-icons/tb';

function App() {
  return (
    <>
      <Flex justify='center' align='center' direction='column'>
        <Heading my={5} fontSize='4xl'>RapidTap</Heading>
        <Text fontSize='xs'>Tap as fast as you can to fill the circle before time runs out!</Text>
        <Text fontSize='xs'>Login to save your score or play without saving!</Text>
        <Flex justify='center' align='center' direction='column' mt='150px'>
          <Flex position='relative'>
            <Button
              m={3}
              className="glow-on-hover"
              w='300px'
            >
              Play!
            </Button>
            <TbArrowBadgeRight
              size='60px'
              className="arrow-badge"
            />
          </Flex>
          <Flex position='relative'>
            <Button
              m={3}
              className="glow-on-hover"
              w='300px'
            >
              Login
            </Button>
            <TbArrowBadgeRight
              size='60px'
              className="arrow-badge"
            />
          </Flex>
          <Flex position='relative'>
            <Button
              m={3}
              className="glow-on-hover"
              w='300px'
            >
              Highscores
            </Button>
            <TbArrowBadgeRight
              size='60px'
              className="arrow-badge"
            />
          </Flex>
          <Flex position='relative'>
            <Button
              m={3}
              className="glow-on-hover"
              w='300px'
            >
              Settings
            </Button>
            <TbArrowBadgeRight
              size='60px'
              className="arrow-badge"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default App;




// <Flex justify='center' align='center' direction='column'>
// <Heading mt={5} fontSize='4xl'>RapidTap</Heading>
// <Flex mt='150px'>
//   <Flex justify='center' align='center' direction='column'>
//    <Button m={3}className="glow-on-hover" w='100%'>Play!</Button>
//    <Button m={3}className="glow-on-hover" w='100%'>Login</Button>
//    <Button m={3}className="glow-on-hover" w='100%'>Highscore</Button>
//    <Button m={3}className="glow-on-hover" w='100%'>Settings</Button>
//   </Flex>
// </Flex>
// </Flex>