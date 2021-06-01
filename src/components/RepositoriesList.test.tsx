import { render, screen, waitFor } from '../test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '../mocks/server';
import userEvent from '@testing-library/user-event';
import RepositoriesList from './RepositoriesList';

describe('RepositoriesList', () => {
  it('has a form with an input and "Search" button, and an empty list', () => {
    render(<RepositoriesList />);
    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');
    const button = screen.getByRole('button', { name: /search/i });
    const list = screen.getByRole('list');
    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(list).toBeInTheDocument();
  });

  it('displays "Loading..." before returning results', async () => {
    render(<RepositoriesList />);
    const button = screen.getByRole('button', { name: /search/i });
    userEvent.click(button);

    const loadingText = await screen.findByRole('heading', {
      name: /loading/i,
    });
    expect(loadingText).toBeInTheDocument();

    const data = await screen.findByRole('listitem');
    expect(data).toBeInTheDocument();
    expect(data.textContent).toBe('react');
  });

  it('displays an error message when the http request fails', async () => {
    server.resetHandlers(
      rest.get(/search/i, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<RepositoriesList />);
    const button = screen.getByRole('button', { name: /search/i });
    userEvent.click(button);

    await waitFor(async () => {
      const error = await screen.findByRole('heading');
      expect(error).toHaveTextContent(/error/i);
    });
  });
});
