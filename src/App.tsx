import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router';
import { PageHeader } from 'Components';
import { Add, Detail, List, NotFound } from 'Pages';
import ToDoListProvider from 'Contexts/ToDoList';

const Container = styled.div``;

function App() {
  return (
    <ToDoListProvider>
      <Container>
        <PageHeader />
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/add" component={Add} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </ToDoListProvider>
  );
}

export default App;
