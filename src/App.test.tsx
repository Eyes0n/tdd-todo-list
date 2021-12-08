import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import renderWithHistory from 'Utils/test/renderWithHistory';

test('should render correctly component', () => {
  const { history } = renderWithHistory(<App />, '/');

  const title = screen.getByText('할 일 목록');
  expect(title).toBeInTheDocument();

  const goBack = screen.queryByText('돌아가기');
  expect(goBack).not.toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
});
