import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('<Button />', () => {
  test('should render correctly default component', () => {
    render(<Button label="Test" />);

    const text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
    const parent = text.parentElement;
    expect(parent).toHaveStyleRule('background-color', '#304FEF');
    expect(parent).toHaveStyleRule('background-color', '#1E40FF', {
      modifier: ':hover',
    });
  });

  test('should reflect colors(background and hover) via props', () => {
    const backgroundColor = '#FF1744';
    const hoverColor = '#F01440';
    render(<Button label="Test" backgroundColor={backgroundColor} hoverColor={hoverColor} />);

    const text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
    const parent = text.parentElement;
    expect(parent).toHaveStyleRule('background-color', backgroundColor);
    expect(parent).toHaveStyleRule('background-color', hoverColor, {
      modifier: ':hover',
    });
  });

  test('should be called onClick callback func', () => {
    const handleClick = jest.fn();
    render(<Button label="Test" onClick={handleClick} />);

    const text = screen.getByText('Test');
    expect(handleClick).toBeCalledTimes(0);
    fireEvent.click(text);
    expect(handleClick).toBeCalledTimes(1);
  });
});
