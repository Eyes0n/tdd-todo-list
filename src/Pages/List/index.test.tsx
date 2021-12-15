import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { List } from 'Pages';
import { MemoryRouter, Route, useLocation } from 'react-router-dom';
import { Location } from 'history';
import ToDoListProvider from 'Contexts/ToDoList';

describe('<List />', () => {
  test('should render correctly component', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["todo1", "todo2", "todo3"]');

    render(
      <ToDoListProvider>
        <List />
      </ToDoListProvider>,
      { wrapper: MemoryRouter }
    );

    const todos = screen.getAllByText(/todo/i);
    todos.forEach((todo) => {
      expect(todo).toBeInTheDocument();
    });

    const deleteBtns = screen.getAllByText(/삭제/i);
    expect(deleteBtns.length).toBe(3);
  });

  test('deletes todo item', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["todo1", "todo2", "todo3"]');

    render(
      <MemoryRouter>
        <ToDoListProvider>
          <List />
        </ToDoListProvider>
      </MemoryRouter>
    );

    const todoItem = screen.getByText('todo1');
    const delBtn = todoItem.nextElementSibling as HTMLButtonElement;
    expect(delBtn.textContent).toMatch('삭제');

    fireEvent.click(delBtn);
    expect(todoItem).not.toBeInTheDocument();
  });

  test('should route to detail page from home', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["todo1", "todo2", "todo3"]');
    let testLocation;

    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <React.Fragment>
          <div>{pathname}</div>
          <div>할 일 상세</div>
        </React.Fragment>
      );
    };

    render(
      <MemoryRouter initialEntries={['/']}>
        <ToDoListProvider>
          <List />
          <Route
            path="/detail/:id"
            render={({ location }) => {
              testLocation = location;
              return <TestComponent />;
            }}
          />
        </ToDoListProvider>
      </MemoryRouter>
    );

    const todo = screen.getByText(/todo2/i);
    expect(todo.getAttribute('href')).toBe('/detail/1');

    fireEvent.click(todo);
    const text = screen.getByText('할 일 상세');
    expect(text).toBeInTheDocument();

    testLocation = testLocation as unknown as Location;
    expect(testLocation.pathname).toBe('/detail/1');
  });

  test('should route to add page from home', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <React.Fragment>
          <div>{pathname}</div>
          <div>할 일 추가</div>
        </React.Fragment>
      );
    };

    let testLocation;
    render(
      <MemoryRouter initialEntries={['/']}>
        <List />
        <Route
          path="/add"
          render={({ location }) => {
            testLocation = location;
            return <TestComponent />;
          }}
        />
      </MemoryRouter>
    );

    const addText = screen.getByText('+');
    expect(addText).toBeInTheDocument();
    expect(addText.getAttribute('href')).toBe('/add');

    fireEvent.click(addText);
    const urlText = screen.getByText('/add');
    expect(urlText.textContent).toBe('/add');

    testLocation = testLocation as unknown as Location;
    expect(testLocation.pathname).toBe('/add');
  });
});
