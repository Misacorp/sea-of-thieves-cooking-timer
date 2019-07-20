import RoomStore from "../RoomStore";
import getClientRooms from "../getClientRooms";

/**
 * Gets a client's Room.
 */
const getRoom = client => {
  const roomCode = getClientRooms(client)[0];
  return RoomStore.getRoom(roomCode);
};

/**
 * Emits a timer sync event.
 * @param {object} client Client to submit the event to.
 * @param {object} room   Room whose timers to submit
 */
const emitTimerSync = (client, optionalRoom) => {
  const room = optionalRoom || getRoom(client);

  // console.log(`[emitTimerSync] room ${room.code}. Timers:`, room.timers);

  client.emit("TIMER_SYNC", {
    timestamp: new Date(),
    timers: room.timers
  });
};

export default emitTimerSync;
