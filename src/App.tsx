import './App.css'
import {ChakraProvider} from "@chakra-ui/react"
import SudokuBoard from './components/sudokuBoard'
import { Box } from '@chakra-ui/react'
import GameControls from './components/gameControls'
import Timer from './components/timer'
import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './components/buttonTheme'
import ControlsList from './components/controlsList'
import ShuffleAndNewGameControls from './components/shuffleAndNewGame'

function App() {
  const theme = extendTheme({
    components: { Button: buttonTheme}
  });
  return (
    <ChakraProvider theme={theme}>
      <Box data-testid="App" id="App">
        <Box display={{base:'block', '2xl': 'flex'}} justifyContent='center' alignItems='center'>
          <Box width={{base:'100%', '2xl': '45%'}}>
            <Timer />
            <SudokuBoard />
            <GameControls />
          </Box>
          <Box width={{base:'100%', '2xl': '400px'}}>
            <ControlsList />
            <ShuffleAndNewGameControls />
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
