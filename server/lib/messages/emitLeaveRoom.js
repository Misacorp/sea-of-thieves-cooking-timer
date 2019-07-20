/**
 * Emits a room-wide event saying a client left.
 */
const emitSelfJoined = (client, roomCode, nickname) => {

  client
    .to(roomCode)
    .emit("USER_LEFT", {
      nickname,
      roomCode,
      timestamp: new Date()
    });
};

export default emitSelfJoined;
