import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders with the heading "Search For a Package"', () => {
    render(<App />);
    const heading = screen.getByRole('heading', {
      name: /search for a package/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
