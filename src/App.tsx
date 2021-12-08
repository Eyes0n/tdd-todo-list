import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router';
import { PageHeader } from 'Components';
import { List } from 'Pages';

const Container = styled.div``;

function App() {
  return (
    <Container>
      <PageHeader />
      <Switch>
        <Route exact path="/" component={List} />
      </Switch>
    </Container>
  );
}

export default App;
