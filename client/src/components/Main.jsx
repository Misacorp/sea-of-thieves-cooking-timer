import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import useComms from './hooks/useComms';
import EventContext from './contexts/EventContext';
import OnlineContext from './contexts/OnlineContext';

import Header from './Header';
import Welcome from './Welcome';
import RoomSelect from './RoomSelect';
import AppControls from './AppControls';
import MessageDisplay from './MessageDisplay/MessageDisplay';

/**
 * Actual main app content.
 */
const Main = () => {
  // Store an app-wide event queue
  const [events, setEvents] = useState([]);
  const addEvent = newEvent =>
    setEvents(prevEvents => [...prevEvents, newEvent]);
  const eventValue = { events, addEvent };

  // Does the user want to be online or not?
  const [online, setOnline] = useState(null);

  // Connect to the socket
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:1338'
      : '__heroku_address_here__';

  const socket = io(serverUrl);
  const onlineValue = { online, setOnline, socket }; // Provide this to context consumers.

  return (
    <EventContext.Provider value={eventValue}>
      <OnlineContext.Provider value={onlineValue}>
        <React.Fragment>
          <Header />
          {online === null && <Welcome />}

          {online === true && <RoomSelect />}
          <MessageDisplay />
          <AppControls />
        </React.Fragment>
      </OnlineContext.Provider>
    </EventContext.Provider>
  );
};

export default Main;
