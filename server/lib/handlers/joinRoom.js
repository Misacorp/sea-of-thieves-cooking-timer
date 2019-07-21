import RoomStore from "../RoomStore";
import User from "../types/User";

import emitSelfJoined from "../messages/emitSelfJoined";
import emitTimerSync from "../messages/emitTimerSync";
import emitMemberList from "../messages/emitMemberList";

import leaveRooms from "./leaveRooms";

/**
 * Adds a client to a room and notifies participants of their arrival.
 * @param {string} roomCode Room code
 * @param {string} nickname Client's nickname
 */
const joinRoom = (client, { roomCode, nickname }) => {
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

  // Tell the client they joined and give them a list of other members in the room.
  emitSelfJoined(client, roomCode);
  // Transmit room timer data to client.
  emitTimerSync(client, room);
  // Transmit list of members
  emitMemberList(client, room);

};

export default joinRoom;
