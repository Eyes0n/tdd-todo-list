import React, { useContext } from 'react';
import { ToDoListContext } from 'Contexts/ToDoList';
import { ToDoList } from 'Components';

const ToDoListContainer = () => {
  const { toDoList, deleteTodo } = useContext(ToDoListContext);
  return <ToDoList toDos={toDoList} onDelete={deleteTodo} />;
};

export default ToDoListContainer;
