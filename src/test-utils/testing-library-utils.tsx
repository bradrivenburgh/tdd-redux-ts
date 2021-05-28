import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../state';

const TestProvider: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: TestProvider, ...options });

// re-export everything

export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
