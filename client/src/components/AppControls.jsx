import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  PAGE_TRANSITION_NAME,
  PAGE_TRANSITION_DURATION,
} from '../constants/config';
import { slideInUp, slideOutUp } from './Generic/transitionAnimations';

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

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  /* These don't seem to work here atm */
  &.${PAGE_TRANSITION_NAME}-enter {
    animation: ${slideInUp} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
  &.${PAGE_TRANSITION_NAME}-exit {
    animation: ${slideOutUp} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
`;

export default AppControls;
