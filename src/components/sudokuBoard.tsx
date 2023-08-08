import SudokuCell from './cell'
import { SimpleGrid, Box } from "@chakra-ui/react"
import { getRowAndColumnByBlockAndIndex } from '../gameLogic/helpers'
import { ClipLoader } from 'react-spinners'
import { useGameState } from '../stateManagement/gameState'
import { BsPlayCircleFill } from 'react-icons/bs'
import FinishedGameBanner from './finishedGameBanner'

const SudokuBoard:React.FC = () => {
  const [state, actions] = useGameState();
  let className = "board";
  if (state.isLoading || state.isPaused) {
    className += " board-blurred"
  }
  return (
    <Box position={"relative"}>
      {state.game.isSolved && !state.isLoading? <FinishedGameBanner /> : null}
      <Box id="loader-wrapper">
        {state.isLoading ? <ClipLoader /> : null}
        {state.isPaused ? <BsPlayCircleFill color="orange" size="3rem" onClick={() => actions.toggleTimer()}/> : null}
      </Box>
      <SimpleGrid fontSize={"clamp(14px, 4vw, 22px)"} columns={3}  className={className} width='100%'>
        {[...Array(9)].map((_e, block) => {
          return (
            <SimpleGrid key={block} columns={3} spacing={0} outline={"2px solid #144F61"}>
              {[...Array(9)].map((_e, index) => {
                const [row, col] = getRowAndColumnByBlockAndIndex(block, index);
                return (
                  <SudokuCell key={index} row={row} col={col} />
                )
              })}
            </SimpleGrid>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

export default SudokuBoard;