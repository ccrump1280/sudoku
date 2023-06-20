import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders without error', () => {
  render(<App />);
  const appElement = screen.findByTestId("App");
  expect(appElement).toBeTruthy;
});
