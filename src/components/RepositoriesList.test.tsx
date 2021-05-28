import { render, screen } from '../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import RepositoriesList from './RepositoriesList';
import { Provider } from 'react-redux';
import { store } from '../state';

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

  it('displays "Loading..." before returning results', () => {});
});
