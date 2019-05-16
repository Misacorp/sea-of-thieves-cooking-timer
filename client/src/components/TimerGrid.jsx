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
  margin: 0.5rem;
`;

// Currently the grid only allows us to create a predefined amount of timers.
// Look into generating layouts dynamically!
const TimerGrid = () => {
  const [timers] = useState([
    new Timer(),
    new Timer(),
    new Timer(),
    new Timer(),
  ]);

  // Give this component an internal date that refreshes each timer.
  const [, setDate] = useState(new Date());

  // Ticking function to update the stored date.
  const tick = () => {
    setDate(new Date()); // This refreshes the component state and triggers a re-render (?)
  };

  /**
   * Set up an internal interval to call tick()
   * Runs on mount and clears itself on unmount.
   */
  useEffect(() => {
    const timerID = setInterval(() => tick(), 100);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []); // Only run on 'mount' and 'unmount'.

  /**
   * Handles changing food of a given Timer.
   * @param {number} index   Index of the timer whose food to change.
   * @param {string} newFood New food.
   */
  const changeFood = (index, newFood) => () => {
    const timer = timers[index];
    timer.setFood(newFood);
    timer.start();
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

export default TimerGrid;
