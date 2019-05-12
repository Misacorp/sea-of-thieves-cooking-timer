import React from 'react';
import styled from 'styled-components';

import FoodSelect from './FoodSelect';

import SquareFlexContainer from './Generic/Containers/SquareFlexContainer';

const MainContainer = styled(SquareFlexContainer)`
  padding: 0.5rem;
  max-width: calc(100vw - 1rem);
  background-color: palegoldenrod;
`;

const Main = () => {
  return (
    <React.Fragment>
      <MainContainer>
        <FoodSelect />
        <FoodSelect />
        <FoodSelect />
        <FoodSelect />
        <FoodSelect />
        <FoodSelect />
        <FoodSelect />
      </MainContainer>
    </React.Fragment>
  );
};

export default Main;
