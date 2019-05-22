/**
 * Returns an array of all room IDs the given client is in.
 */
const getClientRooms = client => {
  return Object.keys(client.rooms);
};

export default getClientRooms;
