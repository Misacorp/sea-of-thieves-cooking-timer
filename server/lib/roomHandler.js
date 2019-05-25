import getRooms from "./getClientRooms";
import RoomStore from "./RoomStore";

import User from "./types/User";
import Room from "./types/Room";

/**
 * Handles clients joining and leaving rooms.
 */
const roomHandler = (io, client) => {
  /**
   * Emits a 'nickname left the room' event to the given room.
   */
  const emitLeaveRoom = (roomId, nickname) => {
    if (roomId.length === 4) {
      io.to(roomId).emit("USER_LEFT", { nickname, timestamp: new Date() });
    }
  };

  /**
   * Adds a client to a room and notifies participants of their arrival.
   * @param {string} roomCode Room code
   * @param {string} nickname Client's nickname
   */
  const joinRoom = (roomCode, nickname) => {
    console.log(`${nickname} is joining room ${roomCode}`);

    // Clients can only be in one room at a single time.
    // Leave all rooms the client is currently in.
    leaveRooms();

    // Join new room
    client.join(roomCode);

    // Update in-memory room list
    const user = new User(nickname);
    const room = new Room(roomCode);
    room.members.push(user); // Add user to room.
    const roomCount = RoomStore.addRoom(room);

    console.log(`New room count is ${roomCount}`);

    // Notify room members of the new arrival
    client
      .to(roomCode)
      .emit("USER_JOINED", { nickname, timestamp: new Date() });
    
    // Notify client that they arrived
    client.emit("USER_JOINED", { nickname: "You", timestamp: new Date() });

    // Transmit room timer data to client.
    // Should updates from clients always contain the entire state of their timers?
  };

  /**
   * Removes a client from ALL rooms and notifies participants.
   */
  const leaveRooms = () => {
    console.log(`Client is leaving the following rooms:`);
    getRooms(client).forEach(room => {
      console.log(room);
      emitLeaveRoom(room, "Someone");
    });
    client.leaveAll();
  };

  return {
    joinRoom,
    leaveRooms
  };
};

export default roomHandler;
