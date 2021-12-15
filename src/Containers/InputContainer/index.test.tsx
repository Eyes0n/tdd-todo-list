import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputContainer } from 'Containers';
import ToDoListProvider from 'Contexts/ToDoList';

describe('<InputContainer />', () => {
  test('should render correctly component', () => {
    render(<InputContainer />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const addBtn = screen.getByText('추가');
    expect(addBtn).toBeInTheDocument();
  });

  test('should empty data after adding a new ToDo', async () => {
    render(<InputContainer />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'new Todo' } });
    expect(input.value).toBe('new Todo');

    const addBtn = screen.getByText('추가');
    fireEvent.click(addBtn);
    expect(input.value).toBe('');
  });

  test('should add input data to localStorage via context', () => {
    render(
      <ToDoListProvider>
        <InputContainer />
      </ToDoListProvider>
    );

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요') as HTMLInputElement;
    const addBtn = screen.getByText('추가');

    expect(localStorage.getItem('TodoList')).toBeNull();

    fireEvent.change(input, { target: { value: 'new Todo' } });
    fireEvent.click(addBtn);

    expect(localStorage.getItem('TodoList')).toBe('["new Todo"]');
  });

  test('should call the onRedirect Func when Add Button is clicked', () => {
    const handleClick = jest.fn();

    render(<InputContainer onRedirect={handleClick} />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요') as HTMLInputElement;
    const addBtn = screen.getByText('추가');

    expect(input.value).toBe('');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(addBtn);
    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: 'new Todo' } });
    fireEvent.click(addBtn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
