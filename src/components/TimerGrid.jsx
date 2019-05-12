import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import grid from 'easy-grid';

import Timer from '../types/Timer';
import TimerComponent from './Timers/TimerComponent';

const GridBase = grid`
    50%   50%
50% A     B
50% C     D
`;

const Grid = styled(GridBase)`
  width: calc(100vw - 1rem);
  height: calc(100vw - 1rem);
  background-color: ${({ theme }) => theme.palette.primary.dark};
  margin: 0.5rem;
`;

// Currently the grid only allows us to create a predefined amount of timers.
// Look into generating layouts dynamically!
const Timers = () => {
  const [timers, setTimers] = useState([
    new Timer(),
    new Timer(),
    new Timer(),
    new Timer(),
  ]);

  // Give this component an internal date that refreshes each timer.
  const [date, setDate] = useState(new Date());

  // Ticking function to update the stored date.
  const tick = () => {
    setDate(new Date());
  };

  /**
   * Set up an internal interval to call tick()
   */
  useEffect(() => {
    const timerID = setInterval(() => tick(), 100);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  /**
   * On each tick, update all timers.
   */
  useEffect(() => {
    timers.forEach(timer => {
      timer.tick();
    });
  }, [date]);

  /**
   * Handles changing food of a given Timer.
   * @param {number} index   Index of the timer whose food to change.
   * @param {string} newFood New food.
   */
  const changeFood = (index, newFood) => () => {
    setTimers([
      ...timers.slice(0, index),
      timers[index].setFood(newFood),
      ...timers.slice(Math.min(index + 1, timers.length), timers.length),
    ]);
  };

  return (
    <Grid>
      {timers.map((timer, index) => (
        <TimerComponent
          food={timer.food}
          changeFood={newFood => changeFood(index, newFood)}
          timeLeft={timer.getTimeLeft()}
          key={timer.id}
        />
      ))}
    </Grid>
  );
};

export default Timers;
