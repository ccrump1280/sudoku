import { render, screen } from '@testing-library/react';
import SudokuBoard from '../components/sudokuBoard';

test('Should render without error', () => {
  render(<SudokuBoard />);
  const appElement = screen.findByTestId("App");
  expect(appElement).toBeTruthy;
});
