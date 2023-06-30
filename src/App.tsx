import './App.css'
import {ChakraProvider} from "@chakra-ui/react"
import SudokuBoard from './components/sudokuBoard'

function App() {

  return (
    <ChakraProvider>
      <div data-testid="App">
        <SudokuBoard />
      </div>
    </ChakraProvider>
  )
}

export default App
