import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Add } from 'Pages';
import { MemoryRouter, Route, useLocation } from 'react-router';
import ToDoListProvider from 'Contexts/ToDoList';

describe('<Add />', () => {
  test('should render correctly component', () => {
    render(<Add />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const addBtn = screen.getByText('추가');
    expect(addBtn).toBeInTheDocument();
  });

  test('should route home when add new todo', () => {
    localStorage.setItem('TodoList', '["Old Todo"]');

    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <>
          <div>{pathname}</div>
        </>
      );
    };

    let testLocation;
    render(
      <MemoryRouter initialEntries={['/add']}>
        <ToDoListProvider>
          <Add />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return <TestComponent />;
            }}
          />
        </ToDoListProvider>
      </MemoryRouter>
    );
    const url = screen.getByText('/add');
    expect(url.textContent).toBe('/add');
    expect((testLocation as unknown as Location).pathname).toBe('/add');

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요') as HTMLInputElement;
    const addBtn = screen.getByText('추가');
    expect(input).toHaveTextContent('');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    expect(input).toHaveValue('New Todo');
    expect(input.value).toMatch('New Todo'); // as키워드로 casting

    fireEvent.click(addBtn);

    expect(input).toHaveValue('');
    expect(localStorage.getItem('TodoList')).toBe('["Old Todo","New Todo"]');
    expect(url.textContent).toBe('/');
    expect((testLocation as unknown as Location).pathname).toBe('/');
  });

  test('should not do anything when input is empty', () => {
    localStorage.setItem('TodoList', '["Old Todo"]');

    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <>
          <div>{pathname}</div>
        </>
      );
    };

    let testLocation;
    render(
      <MemoryRouter initialEntries={['/add']}>
        <Add />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return <TestComponent />;
          }}
        />
      </MemoryRouter>
    );
    const url = screen.getByText('/add');
    expect(url.textContent).toBe('/add');
    expect((testLocation as unknown as Location).pathname).toBe('/add');

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요') as HTMLInputElement;
    const addBtn = screen.getByText('추가');
    expect(input).toHaveTextContent('');

    fireEvent.click(addBtn);
    expect(input).toHaveValue('');
    expect(url.textContent).toBe('/add');
    expect((testLocation as unknown as Location).pathname).toBe('/add');
  });
});
