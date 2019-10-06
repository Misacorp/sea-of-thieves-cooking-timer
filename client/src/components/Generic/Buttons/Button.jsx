import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import buttonStyle from './buttonStyle';

const ButtonBase = ({ onClick, children, className }) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

const Button = styled(ButtonBase)`
  ${buttonStyle}
`;

ButtonBase.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
