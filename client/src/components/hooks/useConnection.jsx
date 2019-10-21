import { useContext } from 'react';
import ConnectionContext from '../contexts/ConnectionContext';

/**
 * Allows access to the Connection Context.
 */
const useConnection = () => {
  return useContext(ConnectionContext);
};

export default useConnection;
