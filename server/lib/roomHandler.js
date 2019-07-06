import RoomStore from "./RoomStore";

import emitSelfJoined from "./messages/emitSelfJoined";
import emitTimerSync from "./messages/emitTimerSync";

import leaveRooms from './handlers/leaveRooms'
import createRoomHandler from './handlers/createRoom';

import User from "./types/User";

/**
 * Handles clients joining and leaving rooms.
 */
const roomHandler = (io, client) => {
  /**
   * Creates a new room, adds the client to it and returns the room code.
   * @param   {string} nickname Client's nickname
   * @returns {string}          Code of the newly created room.
   */
  const createRoom = ({nickname}) => createRoomHandler(client, nickname);

  /**
   * Adds a client to a room and notifies participants of their arrival.
   * @param {string} roomCode Room code
   * @param {string} nickname Client's nickname
   */
  const joinRoom = (roomCode, nickname) => {
    const room = RoomStore.getRoom(roomCode);

    // Halt if the desired room doesn't exist!
    if (!room) {
      console.log(
        `Client ${client.id} tried to join nonexisting room ${roomCode}.`
      );

      client.emit("NONEXISTANT_ROOM", { timestamp: new Date(), roomCode });
      return;
    }

    console.log(`${nickname} is joining room ${roomCode}`);

    // Clients can only be in one room at a single time.
    // Leave all rooms the client is currently in.
    leaveRooms(client);

    // Join new room
    client.join(roomCode);

    // Add the new User to the given Room.
    const user = new User(client.id, nickname);
    room.addMember(user);

    // Notify other room members of the new arrival
    client
      .to(roomCode)
      .emit("USER_JOINED", { nickname, roomCode, timestamp: new Date() });

    // Tell the client they joined.
    emitSelfJoined(client, roomCode);

    // Notify client that they arrived and who else is in the room
    client.emit("MEMBER_LIST", {
      timestamp: new Date(),
      members: room.getMemberNames()
    });

    // Transmit room timer data to client.
    emitTimerSync(client, room);
  };

  return {
    createRoom,
    joinRoom
  };
};

export default roomHandler;
