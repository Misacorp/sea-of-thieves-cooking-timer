import React from 'react';
import PropTypes from 'prop-types';

import TimerButtonGrid from '../../Generic/Grids/TimerButtonGrid';
import FoodSelectButton from '../FoodSelectButton';

const Select = ({ start, className }) => {
  return (
    <TimerButtonGrid className={className}>
      <FoodSelectButton onClick={start('FISH')}>Fish</FoodSelectButton>
      <FoodSelectButton onClick={start('TROPHY_FISH')}>
        Trophy Fish
      </FoodSelectButton>
      <FoodSelectButton onClick={start('MEAT')}>Meat</FoodSelectButton>
      <FoodSelectButton onClick={start('MONSTER_MEAT')}>
        Monster meat
      </FoodSelectButton>
    </TimerButtonGrid>
  );
};

Select.propTypes = {
  start: PropTypes.func,
  className: PropTypes.string,
};

export default Select;
