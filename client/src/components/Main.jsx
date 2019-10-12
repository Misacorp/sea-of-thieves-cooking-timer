import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from './Header';
import Graphic from './Graphic/Graphic';

import Welcome from './Welcome/Welcome';
import Offline from './Offline';
import Online from './Online';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import * as routes from '../types/routes';

import {
  PAGE_TRANSITION_NAME,
  PAGE_TRANSITION_DURATION,
} from '../constants/config';

/**
 * Actual main app content.
 */
const MainStructure = ({ location, className }) => {
  return (
    <div className={className}>
      <Graphic />
      <Header />
      <TransitionGroup component={null}>
        <CSSTransition
          classNames={PAGE_TRANSITION_NAME}
          timeout={PAGE_TRANSITION_DURATION}
          key={location.key}
        >
          <Switch location={location}>
            <Route exact path={routes.OFFLINE} component={Offline} />
            <Route path={routes.ONLINE_ROOT} component={Online} />
            <Route path={routes.ROOT} component={Welcome} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <MessageDisplay />
    </div>
  );
};

MainStructure.propTypes = {
  location: PropTypes.object,
  className: PropTypes.string,
};

const Main = styled(MainStructure)`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 100vh;
`;

export default withRouter(Main);
