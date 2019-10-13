import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
  PAGE_TRANSITION_NAME,
  PAGE_TRANSITION_DURATION,
} from '../../constants/config';

/**
 * Animated Switch component.
 * Children are to be Route components.
 * Uses the standard page transition class name from config.
 * Components are to define their own enter and exit animations.
 */
const AnimatedSwitch = ({ location, children }) => {
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        classNames={PAGE_TRANSITION_NAME}
        timeout={PAGE_TRANSITION_DURATION}
        key={location.key}
      >
        <Switch location={location}>{children}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

AnimatedSwitch.propTypes = {
  location: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.object),
};

export default withRouter(AnimatedSwitch);
