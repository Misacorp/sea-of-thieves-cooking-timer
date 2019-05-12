import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Timer from './Timer';
import { Fish, TrophyFish, Meat, MonsterMeat } from '../types/Foods';

import SquareFlexContainer from './Generic/Containers/SquareFlexContainer';

const FoodSelect = ({ className }) => {
  console.log('FoodSelect className:', className);

  return (
    <div className={className}>
      <SquareFlexContainer style={{ marginTop: '-100%' }}>
        <Timer options={Fish} />
        <Timer options={TrophyFish} />
        <Timer options={Meat} />
        <Timer options={MonsterMeat} />
      </SquareFlexContainer>
    </div>
  );
};

FoodSelect.propTypes = {
  className: PropTypes.string,
};

export default FoodSelect;
