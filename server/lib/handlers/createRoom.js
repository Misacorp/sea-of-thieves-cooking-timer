import uuid from "uuid/v4";

import emitRoomCreated from "../messages/emitRoomCreated";
import makeRoomCode from "../utils/roomCodeGenerator";

import RoomStore from "../RoomStore";
import Room from "../types/Room";
import Timer from "../types/Timer";

import { TIMER_AMOUNT } from "../constants";

/**
 * Creates a new room
 * Client is NOT automatically added to the room
 *
 */
const createRoom = client => {
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

  // Create a new room.
  const room = new Room(roomCode);

  // Add timers to the room
  for (let i = 0; i < TIMER_AMOUNT; i += 1) {
    const timer = new Timer(uuid());
    room.addTimer(timer);
  }

  // Add the Room to the store.
  RoomStore.addRoom(room);

  console.log(`Created new room with code ${roomCode}`);

  emitRoomCreated(client, roomCode);

  return roomCode;
};

export default createRoom;
