import React, { useState } from 'react';
import { Button } from 'Components';
import { useHistory } from 'react-router';

const Add = () => {
  const [todo, setTodo] = useState<string>('');
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo(value);
  };

  const addTodo = (): void => {
    if (todo === '') return;
    const list = JSON.parse(localStorage.getItem('TodoList') || '[]');
    localStorage.setItem('TodoList', JSON.stringify([...list, todo]));
    setTodo('');
    history.replace('/');
  };

  return (
    <>
      <input type="text" value={todo} placeholder="할 일을 입력해 주세요" onChange={onChange} />
      <Button label="추가" onClick={addTodo} />
    </>
  );
};

export default Add;
