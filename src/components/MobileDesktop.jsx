import React from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'

const MobileDesktop = () => {
  const circleStyle = {
    width: '300px',
    height: '50px',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };

  return (
    <Flex align='center' justify='center' direction='column'>
      <Box style={circleStyle} m='55px' className='glow-on-hover'>
        <Text align='center'>Desktop</Text>
      </Box>
      <Box style={circleStyle} m='55px' className='glow-on-hover'>
        <Text align='center'>Mobile</Text>
      </Box>
    </Flex>
  )
}

export default MobileDesktop
