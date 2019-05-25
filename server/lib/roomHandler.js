import getRooms from "./getClientRooms";
import RoomStore from "./RoomStore";

import User from "./types/User";
import Room from "./types/Room";

const ROOMCODE_LENGTH = 4;

/**
 * Handles clients joining and leaving rooms.
 */
const roomHandler = (io, client) => {
  /**
   * Emits a 'nickname left the room' event to the given room.
   */
  const emitLeaveRoom = (roomId, nickname) => {
    if (roomId.length === ROOMCODE_LENGTH) {
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

    // Add the new User to the given Room.
    const user = new User(client.id, nickname);
    let room;
    if (RoomStore.getRoom(roomCode)) {
      // Room with given code already exists.
      room = RoomStore.getRoom(roomCode);
    } else {
      room = new Room(roomCode);
    }
    room.addMember(user);
    RoomStore.addRoom(room);

    // Notify other room members of the new arrival
    client
      .to(roomCode)
      .emit("USER_JOINED", { nickname, timestamp: new Date() });

    // Tell the client they joined.
    client.emit("USER_JOINED", { nickname: "You", timestamp: new Date() });

    // Notify client that they arrived and who else is in the room
    client.emit("MEMBER_LIST", {
      timestamp: new Date(),
      members: room.getMemberNames()
    });

    // Transmit room timer data to client.
    client.emit("TIMER_SYNC", {
      timestamp: new Date(),
      timers: room.timers
    });
  };

  /**
   * Removes a client from ALL rooms and notifies participants.
   */
  const leaveRooms = () => {
    // Loop through all the rooms the client is in
    getRooms(client).forEach(roomCode => {
      // Only do things if the room code is a 'custom' one.
      if (roomCode.length === ROOMCODE_LENGTH) {
        const room = RoomStore.getRoom(roomCode);
        const user = room.getMemberById(client.id);
        if (user) {
          emitLeaveRoom(roomCode, user.nickname);
        }
      }
    });

    client.leaveAll();
  };

  return {
    joinRoom,
    leaveRooms
  };
};

export default roomHandler;
