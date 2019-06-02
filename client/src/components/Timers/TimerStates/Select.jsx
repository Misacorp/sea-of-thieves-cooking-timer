import React from 'react';
import PropTypes from 'prop-types';

import TimerButtonGrid from '../../Generic/Grids/TimerButtonGrid';
import FoodSelectButton from '../FoodSelectButton';

const Select = ({ id, start, className }) => {
  return (
    <TimerButtonGrid className={className}>
      <FoodSelectButton onClick={start(id, 'FISH')}>Fish</FoodSelectButton>
      <FoodSelectButton onClick={start(id, 'TROPHY_FISH')}>
        Trophy Fish
      </FoodSelectButton>
      <FoodSelectButton onClick={start(id, 'MEAT')}>Meat</FoodSelectButton>
      <FoodSelectButton onClick={start(id, 'MONSTER_MEAT')}>
        Monster meat
      </FoodSelectButton>
    </TimerButtonGrid>
  );
};

Select.propTypes = {
  start: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Select;
