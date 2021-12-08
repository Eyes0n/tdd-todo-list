import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'Components';
import { Link } from 'react-router-dom';

const Container = styled.div``;
const TodoItem = styled.div``;

const List = () => {
  const [todoList, setTodoList] = useState<string[]>([]);

  useEffect(() => {
    const todos = localStorage.getItem('TodoList');
    if (todos) {
      setTodoList(JSON.parse(todos));
    }
  }, []);

  const onDelete = (index: number) => {
    const todos = [...todoList];
    todos.splice(index, 1);
    setTodoList(todos);
    localStorage.setItem('TodoList', JSON.stringify(todos));
  };

  return (
    <Container>
      {todoList.map((todo, idx) => (
        <TodoItem key={todo}>
          <Link to={`/detail/${idx}`}>{todo}</Link>
          <Button
            label="삭제"
            backgroundColor="#F01440"
            hoverColor="#F01440"
            onClick={() => onDelete(idx)}
          />
        </TodoItem>
      ))}
      <Link to="/add">+</Link>
    </Container>
  );
};

export default List;
