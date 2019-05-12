import React from 'react';
import styled from 'styled-components';

import FoodSelect from './FoodSelect';

import { SquareContainer } from './Generic/Containers/SquareContainer';

const MainContainer = styled(SquareContainer)`
  padding: 0.5rem;
  max-width: calc(100vw - 1rem);
`;

/**
 * Actual main app content.
 */
const Main = () => {
  return (
    <React.Fragment>
      <MainContainer>
        <FoodSelect />
        <FoodSelect />
        <FoodSelect />
        <FoodSelect />
      </MainContainer>
    </React.Fragment>
  );
};

export default Main;
