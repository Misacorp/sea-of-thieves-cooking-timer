import React from 'react';
import PropTypes from 'prop-types';

import Timer from './Timer';
import { Fish, TrophyFish, Meat, MonsterMeat } from '../types/Foods';

import { SquareContent } from './Generic/Containers/SquareContainer';

/**
 * Food selection container.
 * Should eventually hold state for what is being cooked and show a timer when a food has been selected.
 */
const FoodSelect = ({ className }) => {
  return (
    <div className={className}>
      <SquareContent>
        <Timer options={Fish} />
        <Timer options={TrophyFish} />
        <Timer options={Meat} />
        <Timer options={MonsterMeat} />
      </SquareContent>
    </div>
  );
};

FoodSelect.propTypes = {
  className: PropTypes.string,
};

export default FoodSelect;
