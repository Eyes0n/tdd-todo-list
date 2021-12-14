import React, { useContext } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { ToDoList } from 'Components';
import renderWithHistory from 'Utils/test/renderWithHistory';
import ToDoListProvider, { ToDoListContext } from 'Contexts/ToDoList';

describe('<ToDoList />', () => {
  test('should render correctly component', () => {
    const toDos = ['todo1', 'todo2', 'todo3'];
    renderWithHistory(<ToDoList toDos={toDos} />, '/');

    const toDosContainer = screen.getByTestId('toDoList');
    expect(toDosContainer.childElementCount).toBe(toDos.length);

    const toDoList = screen.getAllByText(/todo/i);
    toDoList.forEach((todo) => expect(todo).toBeInTheDocument());
  });

  test('should delete a ToDo', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["todo1","todo2","todo3"]');

    const TestComponent = () => {
      const { toDoList, deleteTodo } = useContext(ToDoListContext);
      return <ToDoList toDos={toDoList} onDelete={deleteTodo} />;
    };

    renderWithHistory(
      <ToDoListProvider>
        <TestComponent />
      </ToDoListProvider>,
      '/'
    );

    const toDosContainer = screen.getByTestId('toDoList');
    expect(toDosContainer.childElementCount).toBe(3);

    const toDoList = screen.getAllByText(/todo/i);
    toDoList.forEach((todo) => expect(todo).toBeInTheDocument());

    const todo1 = screen.getByText('todo1');
    expect(todo1).toBeInTheDocument();

    const delBtn = todo1.nextElementSibling as HTMLButtonElement;
    fireEvent.click(delBtn);

    expect(todo1).not.toBeInTheDocument();
  });
});
