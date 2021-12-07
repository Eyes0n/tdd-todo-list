import React from 'react';
import styled from 'styled-components';

interface IContainerProps {
  readonly backgroundColor: string;
  readonly hoverColor: string;
}
const Container = styled.div<IContainerProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.label``;

interface IProps {
  readonly label: string;
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
  readonly onClick?: () => void;
}

export const Button = ({
  label = '추가',
  backgroundColor = '#304FEF',
  hoverColor = '#1E40FF',
  onClick,
}: IProps) => {
  return (
    <Container backgroundColor={backgroundColor} hoverColor={hoverColor} onClick={onClick}>
      <Label>{label}</Label>
    </Container>
  );
};
