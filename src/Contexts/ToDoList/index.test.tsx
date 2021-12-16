import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoListProvider, { ToDoListContext } from './index';

beforeEach(() => {
  // localStorage.setItem('TodoList', '["Todo 1","Todo 2","Todo 3"]');
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["Todo 1","Todo 2","Todo 3"]');
});

// afterEach(() => {
//   localStorage.clear();
// });

describe('TodoList Context', () => {
  test('should render component correctly', () => {
    const ChildComponent = () => <div>test</div>;

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const test = screen.getByText('test');
    expect(test).toBeInTheDocument();
  });

  test('should load data in localStorage', () => {
    const ChildComponent = () => {
      const { toDoList } = useContext(ToDoListContext);
      return (
        <div>
          {toDoList.map((todo, i) => (
            <div key={i}>{todo}</div>
          ))}
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const todos = screen.getAllByText(/Todo/i);
    todos.forEach((todo) => {
      expect(todo).toBeInTheDocument();
    });
  });

  test('should add a new ToDo by addTodo func', () => {
    const ChildComponent = () => {
      const { toDoList, addTodo } = useContext(ToDoListContext);
      return (
        <>
          <div data-testid="toDoList">
            {toDoList.map((todo, i) => (
              <div key={i}>{todo}</div>
            ))}
          </div>
          <button type="button" onClick={() => addTodo('new Todo')}>
            추가
          </button>
        </>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(3);

    const addBtn = screen.getByText('추가');
    expect(addBtn).toBeInTheDocument();

    fireEvent.click(addBtn);
    expect(screen.getByText('new Todo')).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(4);
  });

  test('should not add empty data by addTodo func', () => {
    const ChildComponent = () => {
      const { toDoList, addTodo } = useContext(ToDoListContext);
      return (
        <>
          <div data-testid="toDoList">
            {toDoList.map((todo, i) => (
              <div key={i}>{todo}</div>
            ))}
          </div>
          <button type="button" onClick={() => addTodo('')}>
            추가
          </button>
        </>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(3);

    const addBtn = screen.getByText('추가');
    expect(addBtn).toBeInTheDocument();

    fireEvent.click(addBtn);
    expect(toDoList.childElementCount).toBe(3);
  });

  test('should delete a ToDo by deleteTodo func', () => {
    const ChildComponent = () => {
      const { toDoList, deleteTodo } = useContext(ToDoListContext);
      return (
        <>
          <div data-testid="toDoList">
            {toDoList.map((todo, i) => (
              <div key={i} onClick={() => deleteTodo(i)}>
                {todo}
              </div>
            ))}
          </div>
        </>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(3);

    const todo = screen.getByText('Todo 1');
    expect(todo).toBeInTheDocument();

    fireEvent.click(todo);
    expect(todo.textContent).not.toBe('Todo 1');
    expect(toDoList.childElementCount).toBe(2);
  });
});
