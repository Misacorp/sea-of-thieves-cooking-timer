import React, { useState, useEffect } from 'react';

import useComms from './hooks/useComms';
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
  // Does the user want to be online or not?
  const [online, setOnline] = useState(null);
  const contextValue = { online, setOnline }; // Provide this to context consumers.

  // (re-)initialize the socket used by useComms when 'online' changes.
  const { init } = useComms();
  useEffect(() => {
    if (online !== null) {
      init(online);
    }
  }, [online]);

  const content = (
    <React.Fragment>
      <Header />
      {online === null && <Welcome />}

      {online === true && <RoomSelect />}
      <MessageDisplay />
      <AppControls />
    </React.Fragment>
  );

  return (
    <OnlineContext.Provider value={contextValue}>
      {content}
    </OnlineContext.Provider>
  );
};

export default Main;
