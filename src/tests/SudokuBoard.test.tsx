import { render, screen } from '@testing-library/react';
import SudokuBoard from '../components/sudokuBoard';
import Game from '../gameLogic/game';

test('Should render without error', () => {
  const game = new Game("easy");
  render(<SudokuBoard game={game} />);
  const appElement = screen.findByTestId("sudoku-board");
  expect(appElement).toBeTruthy;
});
