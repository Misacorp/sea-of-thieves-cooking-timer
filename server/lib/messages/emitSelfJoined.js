/**
 * Emits an event telling the client that they joined a given room ONLY to that single client.
 */
const emitSelfJoined = (client, roomCode) => {
  client.emit("USER_JOINED", {
    nickname: "You",
    timestamp: new Date(),
    self: true,
    roomCode
  });
};

export default emitSelfJoined;
