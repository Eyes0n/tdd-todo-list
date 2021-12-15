import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ToDoListContainer } from 'Containers';

const Container = styled.div``;

const List = () => {
  return (
    <Container>
      <ToDoListContainer />
      <Link to="/add">+</Link>
    </Container>
  );
};

export default List;
