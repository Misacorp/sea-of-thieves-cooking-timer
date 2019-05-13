import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import grid from 'easy-grid';

import FoodSelectButton from '../FoodSelectButton';

const GridBase = grid`
    50% 50%
40% A   B
40% C   D
20% E   E
`;

const Grid = styled(GridBase)`
  width: 100%;
  height: 100%;
`;

/**
 * Main Timer component.
 * Initially shows a selection of available timers.
 * When a timer is selected, sets up a timer for that duration.
 * Displays imagery related to what's cooking.
 */
const TimerBase = ({ food, changeFood, timeLeft, className }) => {
  if (food) {
    return (
      <div className={className}>
        <p>{food} is cooking</p>
        <h2>{timeLeft}</h2>
      </div>
    );
  }
  return (
    <div className={className}>
      <Grid>
        <FoodSelectButton onClick={changeFood('FISH')}>Fish</FoodSelectButton>
        <FoodSelectButton onClick={changeFood('TROPHY_FISH')}>
          Trophy Fish
        </FoodSelectButton>
        <FoodSelectButton onClick={changeFood('MEAT')}>Meat</FoodSelectButton>
        <FoodSelectButton onClick={changeFood('MONSTER_MEAT')}>
          Monster meat
        </FoodSelectButton>
        <FoodSelectButton onClick={changeFood('TEST')}>Test</FoodSelectButton>
      </Grid>
    </div>
  );
};

TimerBase.propTypes = {
  food: PropTypes.string,
  changeFood: PropTypes.func,
  timeLeft: PropTypes.number,
  className: PropTypes.string,
};

const Timer = styled(TimerBase)`
  height: calc(100% - 0.5rem);
  width: calc(100% - 0.5rem);
  padding: 0.1rem;
  margin: 0.25rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};

  text-align: center;
`;

export default Timer;
