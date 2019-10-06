import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Graphic from './Graphic/Graphic';

import Welcome from './Welcome/Welcome';
import Offline from './Offline';
import Online from './Online';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import * as routes from '../types/routes';

/**
 * Actual main app content.
 */
const MainStructure = ({ className }) => {
  return (
    <div className={className}>
      <Graphic />
      <Header />
      <Switch>
        <Route exact path={routes.OFFLINE} component={Offline} />
        <Route path={routes.ONLINE_ROOT} component={Online} />
        <Route path={routes.ROOT} component={Welcome} />
      </Switch>
      <MessageDisplay />
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
