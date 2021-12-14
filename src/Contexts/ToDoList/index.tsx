import React, { createContext, useEffect, useState } from 'react';

interface ITodoListContext {
  readonly toDoList: string[];
  readonly addTodo: (toDo: string) => void;
  readonly deleteTodo: (idx: number) => void;
}

export const ToDoListContext = createContext<ITodoListContext>({
  toDoList: [],
  addTodo: (): void => {},
  deleteTodo: (): void => {},
});

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const ToDoListProvider = ({ children }: IProps) => {
  const [toDoList, setToDoList] = useState<string[]>([]);

  const addTodo = (toDo: string) => {
    if (!toDo) return;

    const newList = [...toDoList, toDo];
    localStorage.setItem('TodoList', JSON.stringify(newList));
    setToDoList(newList);
  };

  const deleteTodo = (idx: number) => {
    const list = [...toDoList];
    list.splice(idx, 1);
    localStorage.setItem('TodoList', JSON.stringify(list));
    setToDoList(list);
  };

  useEffect(() => {
    const list = localStorage.getItem('TodoList');
    if (list) {
      setToDoList(JSON.parse(list));
    }
  }, []);

  return (
    <ToDoListContext.Provider value={{ toDoList, addTodo, deleteTodo }}>
      {children}
    </ToDoListContext.Provider>
  );
};

export default ToDoListProvider;
