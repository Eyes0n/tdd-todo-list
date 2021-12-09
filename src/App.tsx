import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router';
import { PageHeader } from 'Components';
import { Add, Detail, List } from 'Pages';

const Container = styled.div``;

function App() {
  return (
    <Container>
      <PageHeader />
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/add" component={Add} />
        <Route path="/detail/:id" component={Detail} />
      </Switch>
    </Container>
  );
}

export default App;
