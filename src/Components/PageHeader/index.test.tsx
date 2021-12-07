import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { PageHeader } from './index';

const renderWithHistory = (component: JSX.Element, route: string) => {
  const history = createMemoryHistory();
  history.push(route);
  return {
    history,
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe('<PageHeader />', () => {
  test('should render correctly component', () => {
    const { history } = renderWithHistory(<PageHeader />, '/');

    const title = screen.getByText('할 일 목록');
    expect(title).toBeInTheDocument();

    const goBack = screen.queryByText('돌아가기');
    expect(goBack).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  describe('should render corretly component along a given route', () => {
    test('/', () => {
      const { history } = renderWithHistory(<PageHeader />, '/');

      const title = screen.getByText('할 일 목록');
      expect(title).toBeInTheDocument();
      expect(history.location.pathname).toBe('/');

      const goBack = screen.queryByText('돌아가기');
      expect(goBack).not.toBeInTheDocument();
    });

    test('/add', () => {
      const { history } = renderWithHistory(<PageHeader />, '/add');

      const title = screen.getByText('할 일 추가');
      expect(title).toBeInTheDocument();
      expect(history.location.pathname).toBe('/add');

      const goBack = screen.getByText('돌아가기');
      expect(goBack).toBeInTheDocument();
      expect(goBack.getAttribute('href')).toBe('/');
    });

    test('/detail/:id', () => {
      const { history } = renderWithHistory(<PageHeader />, '/detail/1');

      const title = screen.getByText('할 일 상세');
      expect(title).toBeInTheDocument();
      expect(history.location.pathname).toBe('/detail/1');

      const goBack = screen.getByText('돌아가기');
      expect(goBack).toBeInTheDocument();
      expect(goBack.getAttribute('href')).toBe('/');
    });

    test('incorret route (`/not_found`)', () => {
      const { history } = renderWithHistory(<PageHeader />, '/not_found');

      const title = screen.getByText('not_found');
      expect(title).toBeInTheDocument();
      expect(history.location.pathname).toBe('/not_found');

      const goBack = screen.getByText('돌아가기');
      expect(goBack).toBeInTheDocument();
      expect(goBack.getAttribute('href')).toBe('/');
    });

    test('goBack Link', () => {
      const { history } = renderWithHistory(<PageHeader />, '/not_found');

      const title = screen.getByText('not_found');
      expect(title).toBeInTheDocument();

      const goBack = screen.getByText('돌아가기');
      fireEvent.click(goBack);

      const text = screen.getByText('할 일 목록');
      expect(text).toBeInTheDocument();
      expect(goBack).not.toBeInTheDocument();
      expect(history.location.pathname).toBe('/');
    });
  });
});
