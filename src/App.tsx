import './App.css'
import {ChakraProvider} from "@chakra-ui/react"
import SudokuBoard from './components/sudokuBoard'
import { Box } from '@chakra-ui/react'
import GameControls from './components/gameControls'
import Timer from './components/timer'

function App() {
  return (
    <ChakraProvider>
      <Box data-testid="App" id="App">
        <Timer />
        <SudokuBoard />
        <GameControls />
      </Box>
    </ChakraProvider>
  )
}

export default App
