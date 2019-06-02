import React, { useState, useEffect, useRef } from 'react';

import { TIMER_SYNC } from '../actions/actions';
import useSubscription from '../hooks/useSubscription';
import useComms from '../hooks/useComms';

import FourByFourGrid from '../Generic/Grids/FourByFourGrid';
import OnlineTimer from './OnlineTimer';

const TimerGrid = () => {
  const { start } = useComms();

  // Store an array of timers we will later render into components.
  const [timers, setTimers] = useState([]);

  // Store our subscription settings in a ref. We don't want to change these over the course of the component's lifetime.
  const subscriptionSettings = useRef({
    [TIMER_SYNC]: data => {
      console.log('🕙 Timers:', data.timers);
      setTimers(data.timers);
    },
  });
  // Subscribe to the events above.
  useSubscription(subscriptionSettings.current);

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
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []); // Only run on 'mount' and 'unmount'.

  // If server hasn't sent us timers yet.
  if (timers.length !== 4) {
    return <p>No timers</p>;
  }

  return (
    <FourByFourGrid>
      {timers.map(timer => (
        <OnlineTimer
          key={timer.id}
          start={start}
          id={timer.id}
          startDate={timer.startDate}
          duration={timer.duration}
          state={timer.state}
        />
      ))}
    </FourByFourGrid>
  );
};

export default TimerGrid;
