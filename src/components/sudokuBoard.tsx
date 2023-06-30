import SudokuCell from './cell'
import Cell from '../gameLogic/cell'

function SudokuBoard() {
  const testCell = new Cell(0, 0, 0, true);
  testCell.updateNotes(7);
  testCell.updateNotes(5);
  testCell.updateNotes(1);
  return (
    <div data-testid="sudoku-board">
      <SudokuCell cell={testCell}/>
    </div>
  )
}

export default SudokuBoard;