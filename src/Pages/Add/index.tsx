import React from 'react';
import styled from 'styled-components';
import InputContainer from 'Containers/InputContainer';
import { useHistory } from 'react-router';

const Container = styled.div``;

const Add = () => {
  const history = useHistory();
  return (
    <Container>
      <InputContainer onRedirect={() => history.replace('/')} />
    </Container>
  );
};

export default Add;
