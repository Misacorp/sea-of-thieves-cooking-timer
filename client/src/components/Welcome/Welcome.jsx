import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import WelcomeControls from './WelcomeControls';
import TopLink from '../TopLink';

import { slideInLeft, slideOutLeft } from '../Generic/transitionAnimations';
import {
  PAGE_TRANSITION_NAME,
  PAGE_TRANSITION_DURATION,
} from '../../constants/config';

/**
 * Welcome page. Displays the application title and allows the user to select between solo offline use or online use with multiple users.
 */
const WelcomeStructure = ({ className }) => {
  return (
    <div className={className}>
      <TopLink />

      <h1>
        <span>Sea of Thieves</span>Cooking Timer
      </h1>
      <WelcomeControls />
    </div>
  );
};

const Welcome = styled(WelcomeStructure)`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: block;

  h1 {
    display: block;
    margin-top: 5rem;
    text-align: center;
    font-weight: 400;
    letter-spacing: 0.1em;

    span {
      display: block;
      text-transform: uppercase;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
  }

  &.${PAGE_TRANSITION_NAME}-enter {
    animation: ${slideInLeft} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
  &.${PAGE_TRANSITION_NAME}-exit {
    animation: ${slideOutLeft} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
`;

WelcomeStructure.propTypes = {
  className: PropTypes.string,
};

export default Welcome;
