import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Button component
 * Variants:
 *   - Main: Displayed as a block to take up entire width.
 *   - Inline: Displayed as an inline block.
 */
const ButtonBase = ({ onClick, children, className, variant, ...rest }) => {
  return (
    <button type="button" onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
};

ButtonBase.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
};

const Button = styled(ButtonBase)`
  /* Reset button styles */
  border: none;
  font: inherit;
  cursor: pointer;

  display: ${({ variant }) => (variant === 'inline' ? 'inline-block' : 'block')}
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.typography.dark};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')}
  margin-right: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')}
  padding: 0.5rem 1rem;

  border-radius: 3rem;
  text-transform: uppercase;

  &:disabled {
    background-color: ${({ theme }) => theme.palette.disabled.main};
    pointer-events: none;
  }
`;

export default Button;
