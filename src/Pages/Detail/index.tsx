import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { Button } from 'Components';

const Container = styled.div``;
const TodoItem = styled.div``;

interface IRouteParams {
  id: string;
}
const Detail = () => {
  const { id } = useParams<IRouteParams>();
  const { replace } = useHistory();

  const todoList: Array<string> = JSON.parse(localStorage.getItem('TodoList') || '[]');
  const idx = parseInt(id);
  const todo = todoList[idx];

  const deleteTodo = () => {
    const modifiedList = todoList.splice(idx, 1);
    localStorage.setItem('TodoList', JSON.stringify(modifiedList));
    replace('/');
  };

  return (
    <Container>
      <TodoItem data-testid="todo">{todo}</TodoItem>
      <Button label="삭제" onClick={deleteTodo} />
    </Container>
  );
};

export default Detail;
