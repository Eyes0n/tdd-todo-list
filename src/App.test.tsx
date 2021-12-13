import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from './App';
import renderWithHistory from 'Utils/test/renderWithHistory';

beforeEach(() => {
  localStorage.setItem('TodoList', '["Todo 1","Todo 2","Todo 3"]');
});

afterEach(() => {
  localStorage.clear();
});

describe('<App />', () => {
  test('should render correctly component', () => {
    const { history } = renderWithHistory(<App />, '/');

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();

    const goBack = screen.queryByText('돌아가기');
    expect(goBack).toBeNull();

    expect(history.location.pathname).toBe('/');

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(3);

    const toDos = screen.getAllByText(/Todo/i);
    toDos.forEach((todo, i) => {
      expect(todo).toBeInTheDocument();
      expect(todo.getAttribute('href')).toBe(`/detail/${i}`);
    });

    const delBtn = screen.getAllByText('삭제');
    expect(delBtn.length).toBe(toDos.length);

    const addBtn = screen.getByText('+');
    expect(addBtn).toBeInTheDocument();
  });

  test('should delete toDo on List page(Home)', () => {
    renderWithHistory(<App />, '/');

    const toDos = screen.getAllByText(/Todo/i);
    expect(toDos.length).toBe(3);

    fireEvent.click(toDos[0].nextElementSibling as HTMLButtonElement);

    const nextToDos = screen.getAllByText(/Todo/i);
    expect(nextToDos.length).toBe(2);

    const modifiedTodos: string[] = JSON.parse(localStorage.getItem('TodoList') as string);
    expect(modifiedTodos).not.toContain('Todo 1');
  });

  test('should route to Add page and go back List page', () => {
    const { history } = renderWithHistory(<App />, '/');

    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);

    const header = screen.getByText('할 일 추가');
    expect(header).toBeInTheDocument();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const addBtn = screen.getByText('추가');
    expect(addBtn).toBeInTheDocument();

    expect(history.location.pathname).toBe('/add');

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    expect(history.location.pathname).toBe('/');
  });

  test('should add new toDo on Add page and then route to List page', () => {
    const newItem = 'new Todo';
    const { history } = renderWithHistory(<App />, '/add');

    expect(history.location.pathname).toBe('/add');

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const addBtn = screen.getByText('추가');
    expect(addBtn).toBeInTheDocument();

    fireEvent.change(input, { target: { value: newItem } });
    fireEvent.click(addBtn);

    const newTodo = screen.getByText(newItem);
    expect(newTodo).toBeInTheDocument();

    const modifiedTodos: string[] = JSON.parse(localStorage.getItem('TodoList') as string);
    expect(modifiedTodos).toContain(newItem);

    expect(history.location.pathname).toBe('/');
  });

  test('should route to Detail page and go back to List page', () => {
    const { history } = renderWithHistory(<App />, '/');

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();

    expect(history.location.pathname).toBe('/');

    const todo = screen.getByText('Todo 1');
    expect(todo).toBeInTheDocument();

    fireEvent.click(todo);

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();

    expect(header.textContent).toBe('할 일 상세');
    expect(history.location.pathname).toBe('/detail/0');

    const delBtn = screen.getByText('삭제');
    expect(delBtn).toBeInTheDocument();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    expect(history.location.pathname).toBe('/');
  });

  test('should delete a todo on Detail page and then route to List page', () => {
    const { history } = renderWithHistory(<App />, '/detail/0');

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();

    const todo = screen.getByText('Todo 1');
    expect(todo).toBeInTheDocument();

    const delBtn = screen.getByText('삭제');
    expect(delBtn).toBeInTheDocument();

    fireEvent.click(delBtn);

    expect(header.textContent).toBe('할 일 목록');
    expect(history.location.pathname).toBe('/');
    expect(todo).not.toBeInTheDocument();

    const modifiedTodos: string[] = JSON.parse(localStorage.getItem('TodoList') as string);
    expect(modifiedTodos).not.toContain('Todo 1');
  });

  test('should render NotFound page if URL is wrong and then go back List page', () => {
    const { history } = renderWithHistory(<App />, '/wrong_url');

    const header = screen.getByText('not_found');
    expect(header).toBeInTheDocument();

    const text = screen.getByText('Not Found 😿');
    expect(text).toBeInTheDocument();

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    expect(history.location.pathname).toBe('/');
  });
});
