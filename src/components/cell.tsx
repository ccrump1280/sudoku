import Cell from "../gameLogic/cell"
import { Box, SimpleGrid } from "@chakra-ui/react"

interface CellProps {
  cell: Cell
}
interface NotesProps {
  notes: number[]
}

const SudokuCell: React.FC<CellProps> = ({cell}) => {
  const NotesGrid: React.FC<NotesProps> = ({notes}) => {
    return (
      <SimpleGrid columns={3} spacing={0} height="100%">
        {[...Array(9)].map((_e, index) => {
          return (
            <Box fontSize={8} padding={0}>{notes.includes(index + 1) ? index + 1 : null}</Box>
          )
        })}
      </SimpleGrid>
    )
  }
  return (
    <Box borderWidth="1px" width="45px" height="45px" padding={1} className = {"highlight-" + cell.highlightType}>
      {cell.value == 0 ? <NotesGrid notes={cell.notes} /> : cell.value}
    </Box>
  )
}

export default SudokuCell;