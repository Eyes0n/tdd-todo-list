import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from 'Pages';
import renderWithHistory from 'Utils/test/renderWithHistory';
import { MemoryRouter, Route } from 'react-router';

describe('<NotFound />', () => {
  test('should render correctly component', () => {
    render(<NotFound />);

    const text = screen.getByText('Not Found 😿');
    expect(text).toBeInTheDocument();
  });

  test('should be rendered if url is wrong', () => {
    const TestComponent = () => <div>home</div>;
    let testLocation;
    render(
      <MemoryRouter initialEntries={['/wrong_url']}>
        <Route path="/" component={TestComponent} />
        <Route path="*" component={NotFound} />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    const text = screen.getByText('Not Found 😿');
    expect(text).toBeInTheDocument();
    expect((testLocation as unknown as Location).pathname).toBe('/wrong_url');
  });
});
