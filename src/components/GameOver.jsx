import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import '../gameover.scss'

const GameOver = () => {
  return (
    <Box class="content" mb={'40px'}>
        <Heading class="text_shadows">Game Over</Heading>
    </Box>
  )
}

export default GameOver