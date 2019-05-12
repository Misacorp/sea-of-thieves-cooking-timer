import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Main Timer component.
 * Initially shows a selection of available timers.
 * When a timer is selected, sets up a timer for that duration.
 * Displays imagery related to what's cooking.
 */
const TimerBase = ({ food, changeFood, timeLeft, className }) => {
  if (food) {
    return (
      <div>
        <p>{food} is cooking</p>
        <p>{timeLeft}</p>
      </div>
    );
  }
  return (
    <div className={className}>
      <button type="button" onClick={changeFood('FISH')}>
        Fish
      </button>
      <button type="button" onClick={changeFood('TROPHY_FISH')}>
        Trophy Fish
      </button>
      <button type="button" onClick={changeFood('MEAT')}>
        Meat
      </button>
      <button type="button" onClick={changeFood('MONSTER_MEAT')}>
        Monster Meat
      </button>
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
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: black;
`;

export default Timer;
