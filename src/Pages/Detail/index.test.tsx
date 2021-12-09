import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Location } from 'history';
import { Detail } from 'Pages';

describe('<Detail />', () => {
  test('should render correctly component', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["Todo 1","Todo 2","Todo 3"]');
    let testLocation;

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Route
          path="/detail/:id"
          render={({ location }) => {
            testLocation = location;
            return <Detail />;
          }}
        />
      </MemoryRouter>
    );

    const text = screen.getByText('Todo 2');
    const delBtn = screen.getByText('삭제');
    expect(text).toBeInTheDocument();
    expect(delBtn).toBeInTheDocument();
    expect((testLocation as unknown as Location).pathname).toBe('/detail/1');
  });

  test('should route to home when delete button is clicked', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["Todo 1","Todo 2","Todo 3"]');
    let testLocation;
    render(
      <MemoryRouter initialEntries={['/detail/0']}>
        <Route path="/detail/:id" component={Detail} />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    const text = screen.getByText('Todo 1');
    const delBtn = screen.getByText('삭제');
    expect(text).toBeInTheDocument();
    expect(delBtn).toBeInTheDocument();
    expect((testLocation as unknown as Location).pathname).toBe('/detail/0');

    fireEvent.click(delBtn);
    expect((testLocation as unknown as Location).pathname).toBe('/');
    expect(text).not.toBeInTheDocument();
  });
});
