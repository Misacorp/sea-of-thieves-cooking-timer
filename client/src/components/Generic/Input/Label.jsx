import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelStructure = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={`${className}`}>
      {children}
    </label>
  );
};

const Label = styled(LabelStructure)`
  position: absolute;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.palette.yellow[300]};
  font-size: 1.5rem;

  transform: ${({ focused, filled }) =>
    focused || filled
      ? 'scale(0.7) translateY(-1rem)'
      : 'scale(1) translateY(45%)'};
  transform-origin: top left;
  opacity: ${({ focused, filled }) => (focused || filled ? 1 : 0)};

  transition-property: transform opacity;
  transition-duration: ${({ theme }) => theme.transition.duration};
  transition-timing-function: ${({ theme }) => theme.transition.timingFunction};
`;

LabelStructure.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
};

export default Label;
