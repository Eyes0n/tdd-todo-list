import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithHistory = (component: JSX.Element, route: string) => {
  const history = createMemoryHistory();
  history.push(route);
  return {
    history,
    ...render(<Router history={history}>{component}</Router>),
  };
};

export default renderWithHistory;
