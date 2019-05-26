import makeRoomCode from "../dist/utils/roomCodeGenerator";
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
   * Creates a new room, adds the client to it and returns the room code.
   * @param   {string} nickname Client's nickname
   * @returns {string}          Code of the newly created room.
   */
  const createRoom = nickname => {
    // Randomize a four-character string.
    let roomCode = makeRoomCode();
    let count = 0;
    const MAX_ITERATIONS = 1000;

    // Reroll the roomcode until one that doesn't exist is found.
    while (RoomStore.getRoom(roomCode)) {
      console.log(
        `Generated room code ${roomCode} already exists. Trying a new one.`
      );
      roomCode = makeRoomCode;
      count += 1;

      // Forfeit if we didn't find an available room code in a reasonable amount of tries.
      if (count >= MAX_ITERATIONS) {
        console.log(`Could not create a room after trying for so long.`);
        return;
      }
    }

    // Join the Socket.io room.
    client.join(roomCode);

    // Create a user and room.
    const user = new User(client.id, nickname);
    const room = new Room(roomCode);

    // Add the user to the room and room to the store.
    room.addMember(user);
    RoomStore.addRoom(room);

    console.log(`Created new room with code ${roomCode}`);
    client.emit("ROOM_CREATED", { roomCode, timestamp: new Date() });
    client.emit("USER_JOINED", { nickname: "You", timestamp: new Date(), self: true });
  };

  /**
   * Adds a client to a room and notifies participants of their arrival.
   * @param {string} roomCode Room code
   * @param {string} nickname Client's nickname
   */
  const joinRoom = (roomCode, nickname) => {
    console.log(`${nickname} is joining room ${roomCode}`);

    // Halt if the desired room doesn't exist!
    if (!RoomStore.getRoom(roomCode)) {
      console.log(
        `Client ${client.id} tried to join nonexisting room ${roomCode}.`
      );

      client.emit("NONEXISTANT_ROOM", { timestamp: new Date(), roomCode });
      return;
    }

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
    client.emit("USER_JOINED", { nickname: "You", timestamp: new Date(), self: true });

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

        // Let other users know someone left.
        const user = room.getMemberById(client.id);
        if (user) {
          emitLeaveRoom(roomCode, user.nickname);
        }

        // Remove the user from the room's user list.
        delete room.members[client.id];

        // If the member list is empty, delete the entire room.
        if (Object.entries(room.members).length === 0) {
          RoomStore.deleteRoom(roomCode);
        }
      }
    });

    client.leaveAll();
  };

  return {
    createRoom,
    joinRoom,
    leaveRooms
  };
};

export default roomHandler;
