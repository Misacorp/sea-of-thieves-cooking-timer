import createRoomHandler from "./handlers/createRoom";
import joinRoomHandler from "./handlers/joinRoom";

/**
 * Handles clients joining and leaving rooms.
 */
const roomHandler = (io, client) => {
  const createRoom = ({ nickname }) => createRoomHandler(client, nickname);

  const joinRoom = ({ roomCode, nickname }) =>
    joinRoomHandler(client, roomCode, nickname);

  return {
    createRoom,
    joinRoom
  };
};

export default roomHandler;
