import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Radio button.
 * @prop {string} align Radio button and label alignment.
 */
const RadioStructure = ({
  align,
  label,
  group,
  checked = false,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={label}>
        {align === 'left' && <span />}
        {label}
        {align === 'right' && <span />}
      </label>
      <input
        type="radio"
        name={group}
        value={label}
        checked={checked}
        id={label}
        onChange={onChange}
      />
    </div>
  );
};

const size = 32; // Outer stroked circle size.
const factor = 1.75; // Ratio with which to scale the inner circle.
const innerSize = Math.round(10 * (size / factor)) / 10; // Filled inner circle.

const Radio = styled(RadioStructure)`
  display: inline-block;
  padding: 1rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  will-change: opacity;
  opacity: ${({ checked }) => (checked ? 1 : 0.5)};
  transition-property: opacity;
  transition-duration: ${({ theme }) => theme.transition.duration};
  transition-timing-function: ${({ theme }) => theme.transition.timingFunction};
  user-select: none;

  &:hover,
  &:focus {
    opacity: ${({ checked }) => (checked ? 1 : 0.9)};
  }

  /* Hide native radio element */
  & > input[type='radio'] {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    cursor: pointer;
  }

  & > label {
    cursor: inherit;
    position: relative;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: 0.08em;
    line-height: 1em;
    color: ${({ theme }) => theme.palette.yellow[300]};

    /* Empty circle frame */
    & > span {
      display: inline-block;
      position: relative;
      top: ${size / 4}px;
      margin-left: ${({ align }) => (align === 'left' ? 0 : '1rem')};
      margin-right: ${({ align }) => (align === 'right' ? 0 : '1rem')};
      box-sizing: border-box;
      width: ${size}px;
      height: ${size}px;
      border-style: solid;
      border-width: 3px;
      border-color: ${({ theme }) => theme.palette.yellow[300]};
      border-radius: ${size}px;

      /* Circle dot */
      ::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;

        display: block;
        width: ${innerSize}px;
        height: ${innerSize}px;
        border-radius: ${innerSize}px;
        background-color: ${({ theme }) => theme.palette.yellow[300]};

        transform: scale(${({ checked }) => (checked ? 1 : 0)})
          translate(-50%, -50%);
        transform-origin: top left;
        will-change: transform;
        transition-property: transform;
        transition-duration: ${({ theme }) => theme.transition.duration};
        transition-timing-function: ${({ theme }) =>
          theme.transition.timingFunction};
      }
    }
  }
`;

RadioStructure.propTypes = {
  align: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
