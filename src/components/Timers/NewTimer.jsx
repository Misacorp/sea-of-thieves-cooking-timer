import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import foods from '../../types/foods';
import TimerButtonGrid from '../Generic/Grids/TimerButtonGrid';
import FoodSelectButton from '../FoodSelectButton';

const NewTimerBase = ({ className }) => {
  // Give the timer a unique unchanging ID throughout the session.
  const id = uuid();

  // Keep track of the food being cooked.
  const [food, setFood] = useState(null);

  /**
   * Changes food being cooked.
   * Only allow changing foods to ones that exist.
   */
  const changeFood = newFood => () => {
    if (Object.keys(foods).includes(newFood)) {
      console.log('Setting new food to', newFood);
      setFood(newFood);
    } else {
      console.log('Did not set new food to', newFood);
    }
  };

  /**
   * Send the following data to the remote server
   * Timer ID
   * Food
   *
   * The server will respond with a new Date.
   * Pass the date to all Timers.
   */

  return (
    <TimerButtonGrid className={className}>
      <FoodSelectButton onClick={changeFood('FISH')}>Fish</FoodSelectButton>
      <FoodSelectButton onClick={changeFood('TROPHY_FISH')}>
        Trophy Fish
      </FoodSelectButton>
      <FoodSelectButton onClick={changeFood('MEAT')}>Meat</FoodSelectButton>
      <FoodSelectButton onClick={changeFood('MONSTER_MEAT')}>
        Monster meat
      </FoodSelectButton>
      <FoodSelectButton onClick={changeFood('TEST')}>Test</FoodSelectButton>
    </TimerButtonGrid>
  );
};

NewTimerBase.propTypes = {
  className: PropTypes.string,
};

const NewTimer = styled(NewTimerBase)`
  height: calc(100% - 0.5rem);
  width: calc(100% - 0.5rem);
  padding: 0.1rem;
  margin: 0.25rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};

  text-align: center;
`;

export default NewTimer;
