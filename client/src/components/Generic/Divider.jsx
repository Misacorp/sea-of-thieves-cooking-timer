import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Text in the middle of a divider
const DividerText = styled.p`
  display: inline-block;
  background-color: #7a7a7a;
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.palette.typography.dark};
  font-size: 0.75rem;
  font-weight: bold;

  ::before {
    content: '';
    height: 1px;
    width: 100%;
    background-color: #7a7a7a;
    position: absolute;
    left: 0;
    top: 50%;
    z-index: -1;
  }
`;

const DividerBase = ({ className, children }) => {
  return (
    <div className={className}>
      <DividerText>{children}</DividerText>
    </div>
  );
};

DividerBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const Divider = styled(DividerBase)`
  position: relative;
  text-align: center;
`;

export default Divider;
