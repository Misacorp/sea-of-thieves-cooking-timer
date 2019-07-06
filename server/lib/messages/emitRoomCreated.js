/**
 * Emits a ROOM_CREATED event
 * @param {object} client Client to submit the event to.
 * @param {string} roomCode   Code of the room that was created
 */
const emitRoomCreated = (client, roomCode) => {
  client.emit("ROOM_CREATED", { roomCode, timestamp: new Date() });
};

export default emitRoomCreated;
