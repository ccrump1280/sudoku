import { Flex, Box, SimpleGrid } from "@chakra-ui/react"
import { useGameState } from "../stateManagement/gameState"

interface CellProps {
  row: number,
  col: number
}
interface NotesProps {
  notes: number[]
}

const SudokuCell: React.FC<CellProps> = ({row, col}) => {
  const [state, actions] = useGameState();
  const cell = state.game.board[row][col];
  const handleClick = () => {
    if (!state.isPaused) {
      actions.selectCell(row, col);
    }
  }

  let className = "cell cell-highlight-" + cell.highlightType;
  if (cell.isFixed) {
    className += " cell-fixed"
  }else if (cell.value == cell.solutionValue) {
    className += " cell-correct"
  }else {
    className += " cell-incorrect"
  }

  const NotesGrid: React.FC<NotesProps> = ({notes}) => {
    return (
      <SimpleGrid width={"80%"} aspectRatio={1} columns={3} spacing={0} data-testid={"notes" + row + col} color={"black"}>
        {[...Array(9)].map((_e, index) => {
          return (
            <Box key={index} fontSize={"clamp(5px, 1.8vw, 10px)"} aspectRatio={1}>{notes.includes(index + 1) ? index + 1 : null}</Box>
          )
        })}
      </SimpleGrid>
    )
  }
  return (
    <Flex data-testid={"cell" + row + col} onClick={handleClick} className = {className}>
      {state.game.board[row][col].value == 0 ? <NotesGrid notes={state.game.board[row][col].notes} /> : state.game.board[row][col].value}
    </Flex>
  )
}

export default SudokuCell;