import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToDoListContainer } from 'Containers';
import ToDoListProvider from 'Contexts/ToDoList';
import { MemoryRouter } from 'react-router-dom';

describe('<ToDoListContainer />', () => {
  test('should render correctly component', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('["todo1", "todo2", "todo3"]');
    render(
      <MemoryRouter initialEntries={['/']}>
        <ToDoListProvider>
          <ToDoListContainer />
        </ToDoListProvider>
      </MemoryRouter>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(3);

    const toDos = screen.getAllByText(/todo/i);
    toDos.forEach((toDo) => {
      expect(toDo).toBeInTheDocument();
      expect((toDo.nextElementSibling as HTMLButtonElement).textContent).toBe('삭제');
    });
  });
});
