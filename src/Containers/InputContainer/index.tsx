import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ToDoListContext } from 'Contexts/ToDoList';
import { Button, Input } from 'Components';

const Container = styled.div``;

interface IProps {
  readonly onRedirect?: () => void;
}

const InputContainer = ({ onRedirect }: IProps) => {
  const [todo, setTodo] = useState<string>('');
  const { addTodo } = useContext(ToDoListContext);

  const onAdd = (): void => {
    if (todo === '') return;
    addTodo(todo);
    setTodo('');
    if (typeof onRedirect === 'function') {
      onRedirect();
    }
  };

  return (
    <Container>
      <Input value={todo} placeholder="할 일을 입력해 주세요" onChange={setTodo} />
      <Button label="추가" onClick={onAdd} />
    </Container>
  );
};

export default InputContainer;
