import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Header from './Header';
import Graphic from './Graphic/Graphic';
import AnimatedSwitch from './AnimatedSwitch/AnimatedSwitch';

import Welcome from './Welcome/Welcome';
import Offline from './Offline';
import Online from './Online';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import * as routes from '../types/routes';
import { ConnectionContextContainer } from './contexts/ConnectionContext';

/**
 * Actual main app content.
 */
const MainStructure = ({ className }) => {
  return (
    <div className={className}>
      <ConnectionContextContainer>
        <Graphic />
        <Header />
        <AnimatedSwitch>
          <Route exact path={routes.OFFLINE} component={Offline} />
          <Route path={routes.ONLINE_ROOT} render={() => <Online />} />
          <Route path={routes.ROOT} component={Welcome} />
        </AnimatedSwitch>
        <MessageDisplay />
      </ConnectionContextContainer>
    </div>
  );
};

MainStructure.propTypes = {
  className: PropTypes.string,
};

const Main = styled(MainStructure)`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 100vh;
`;

export default Main;
