import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the quiz title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Duolingo Clone/i);
  expect(titleElement).toBeInTheDocument();
});
