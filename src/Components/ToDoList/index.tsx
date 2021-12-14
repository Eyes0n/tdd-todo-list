import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'Components';

const Container = styled.div``;
const TodoItem = styled.div``;

interface IToDoListProps {
  readonly toDos: string[];
  readonly onDelete?: (idx: number) => void;
}

const ToDoList = ({ toDos, onDelete }: IToDoListProps) => {
  const onDeleteTodo = (idx: number) => {
    if (onDelete) {
      onDelete(idx);
    }
  };
  return (
    <Container data-testid="toDoList">
      {toDos.map((todo, idx) => (
        <TodoItem key={todo}>
          <Link to={`/detail/${idx}`}>{todo}</Link>
          <Button
            label="삭제"
            backgroundColor="#F01440"
            hoverColor="#F01440"
            onClick={() => onDeleteTodo(idx)}
          />
        </TodoItem>
      ))}
    </Container>
  );
};

export default ToDoList;
