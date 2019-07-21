import React, { useState, useEffect, useRef } from 'react';

import { TIMER_SYNC } from '../actions/actions';
import useSubscription from '../hooks/useSubscription';
import useComms from '../hooks/useComms';

import FourByFourGrid from '../Generic/Grids/FourByFourGrid';
import OnlineTimer from './OnlineTimer';

const TimerGrid = () => {
  // Store an array of timers we will later render into components.
  const [timers, setTimers] = useState([]);
  const timerCount = timers.length;

  // Store our subscription settings in a ref. We don't want to change these over the course of the component's lifetime.
  const subscriptionSettings = useRef({
    [TIMER_SYNC]: data => {
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

  const { requestTimers } = useComms();
  /**
   * Set up an internal interval to call tick()
   * Runs on mount and clears itself on unmount.
   */
  useEffect(() => {
    const timerID = setInterval(() => tick(), 200); // Tickrate influences the responsiveness of offline UI

    // If no timers are present, request them.
    if (timerCount < 1) {
      console.log(`[TimerGrid] No timers!`);
      requestTimers();
    }

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [timerCount, requestTimers]);

  // If server hasn't sent us timers yet.
  if (timers.length !== 4) {
    return <p>No timers</p>;
  }

  return (
    <FourByFourGrid>
      {timers.map(timer => (
        <OnlineTimer
          key={timer.id}
          id={timer.id}
          startDate={timer.startDate}
          duration={timer.duration}
          foodName={timer.foodName}
          state={timer.state}
        />
      ))}
    </FourByFourGrid>
  );
};

export default TimerGrid;
