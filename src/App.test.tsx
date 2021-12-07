import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './App';

const renderWithHistory = (component: JSX.Element, route: string) => {
  const history = createMemoryHistory();
  history.push(route);
  return {
    history,
    ...render(<Router history={history}>{component}</Router>),
  };
};

test('should render correctly component', () => {
  const { history } = renderWithHistory(<App />, '/');

  const title = screen.getByText('할 일 목록');
  expect(title).toBeInTheDocument();

  const goBack = screen.queryByText('돌아가기');
  expect(goBack).not.toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
});
