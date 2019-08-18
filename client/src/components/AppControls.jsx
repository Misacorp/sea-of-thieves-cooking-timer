import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppControlsContent = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

AppControlsContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const AppControls = styled(AppControlsContent)`
  height: 30px;
  background-color: #efd71f;
  color: black;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AppControls;
