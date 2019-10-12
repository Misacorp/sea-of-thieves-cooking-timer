import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Label from './Label';
import InputBottomBorder from './InputBottomBorder';

/**
 * Input
 */
const InputStructure = ({
  label,
  id,
  name,
  onChange,
  value,
  placeholder,
  required = false,
  className,
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = createRef();

  const handleFocus = isFocused => () => {
    inputRef.current.scrollIntoView();
    setFocused(isFocused);
  };

  return (
    <div className={className}>
      <Label htmlFor={id} focused={focused} filled={value && value.length > 0}>
        {label}
      </Label>
      <input
        type="text"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        ref={inputRef}
      />
      <InputBottomBorder />
    </div>
  );
};

const Input = styled(InputStructure)`
  position: relative;
  display: inline-block;
  text-align: left;
  display: ${({ variant }) =>
    variant === 'inline' ? 'inline-block' : 'block'};
  margin-left: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')};
  margin-right: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')};

  input {
    border: none;
    outline: none;
    background-color: transparent;

    height: 3rem;
    width: 100%;
    color: ${({ theme }) => theme.palette.typography.light};
    font-family: ${({ theme }) => theme.typography.base.fontFamily};
    font-size: 1.5rem;
  }
`;

InputStructure.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
