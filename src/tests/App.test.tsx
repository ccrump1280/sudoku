import { render, screen } from '@testing-library/react';
import App from '../App';

test('Should render without error', () => {
  render(<App />);
  const appElement = screen.findByTestId("App");
  expect(appElement).toBeTruthy;
});
