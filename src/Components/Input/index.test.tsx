import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from 'Components';

describe('<Input/>', () => {
  test('should render correctly component', () => {
    render(<Input value="default value" />);

    const text = screen.getByDisplayValue('default value');
    expect(text).toBeInTheDocument();
  });

  test('should render placeholder correctly', () => {
    render(<Input placeholder="default placeholder" />);

    const placeholder = screen.getByPlaceholderText('default placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  test('should change text value', () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText('default placeholder') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'new Todo' } });
    expect(input.value).toBe('new Todo');
  });
});
