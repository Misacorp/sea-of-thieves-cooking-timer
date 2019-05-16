import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FoodSelectButtonBase = ({ onClick, children, className }) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

const FoodSelectButton = styled(FoodSelectButtonBase)`
  position: relative;
  margin: 0;
  padding: 0rem;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  /* show a hand cursor on hover; some argue that we
  should keep the default arrow cursor for buttons */
  cursor: pointer;

  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.typography.dark};

  width: calc(100% - 6px);
  height: calc(100% - 6px);
  margin: 3px;
`;

FoodSelectButtonBase.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default FoodSelectButton;
