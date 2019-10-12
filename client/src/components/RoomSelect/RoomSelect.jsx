import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { slideInRight, slideOutRight } from '../Generic/transitionAnimations';
import {
  PAGE_TRANSITION_NAME,
  PAGE_TRANSITION_DURATION,
} from '../../constants/config';

import RoomSelectControls from './RoomSelectControls';

/**
 * Room Select page.
 */
const RoomSelectBase = ({ className }) => {
  return (
    <div className={className}>
      <RoomSelectControls />
    </div>
  );
};

RoomSelectBase.propTypes = {
  className: PropTypes.string,
};

const RoomSelect = styled(RoomSelectBase)`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: block;

  &.${PAGE_TRANSITION_NAME}-enter {
    animation: ${slideInRight} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
  &.${PAGE_TRANSITION_NAME}-exit {
    animation: ${slideOutRight} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
`;

export default RoomSelect;
