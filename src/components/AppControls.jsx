import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppControlsContent = ({ className }) => {
  return (
    <div className={className}>
      <div>App Controls here</div>
    </div>
  );
};

AppControlsContent.propTypes = {
  className: PropTypes.string,
};

const AppControls = styled(AppControlsContent)`
  height: 30px;
  background-color: #efd71f;
  color: black;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AppControls;
