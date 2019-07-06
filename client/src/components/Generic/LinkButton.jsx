// eslint-disable ts-styled-plugin

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkButtonBase = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

LinkButtonBase.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

const LinkButton = styled(LinkButtonBase)`
  display: ${({ variant }) => (variant === 'inline' ? 'inline-block' : 'block')}
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.typography.dark};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')}
  margin-right: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')}
  padding: 0.5rem 1rem;
  text-decoration: none;

  border-radius: 3rem;
  text-transform: uppercase;

  &:disabled {
    background-color: ${({ theme }) => theme.palette.disabled.main};
    pointer-events: none;
  }
`;

export default LinkButton;
