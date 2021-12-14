import React from 'react';

interface IInputProps {
  readonly value?: string;
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
}

const Input = ({ value, placeholder, onChange }: IInputProps) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  };
  return <input type="text" placeholder={placeholder} value={value} onChange={onInputChange} />;
};

export default Input;
