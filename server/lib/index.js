import http from "http";
import socketIo from "socket.io";

import getRooms from "./getClientRooms";
import RoomStore from "./RoomStore";
import createRoomHandler from "./roomHandler";

const server = http.createServer();
const io = socketIo(server);

io.on("connection", client => {
  // Debug client list
  const clients = io.sockets.clients();
  console.log("Clients:", Object.keys(clients.connected));

  // Initialize a roomHandler
  const roomHandler = createRoomHandler(io, client);

  /**
   * Handle creating a room.
   */
  client.on("CREATE_ROOM", data => {
    const { nickname } = data;
    roomHandler.createRoom(nickname);
  });

  /**
   * Handle joining rooms.
   */
  client.on("JOIN_ROOM", data => {
    const { nickname, roomCode } = data;
    roomHandler.joinRoom(roomCode, nickname);
  });

  /**
   * Handle leaving rooms.
   */
  client.on("LEAVE_ROOM", () => {
    console.log("Client leaving room", client.id);
    roomHandler.leaveRooms();
  });

  /**
   * Handle timer start.
   */
  client.on("START", data => {
    const { id, food } = data;
    console.log(`Client wants to start timer ${id} with ${food}`);

    // Get the client's room
    const roomCode = getRooms(client)[0];
    const room = RoomStore.rooms[roomCode];

    // Start the correct timer
    try {
      const timer = room.getTimer(id);
      timer.start(food);

      io.in(roomCode).emit("TIMER_SYNC", {
        timestamp: new Date(),
        timers: room.timers
      });
    } catch (e) {
      console.error(e);
      io.in(roomCode).emit("GENERIC_MESSAGE", { message: e.message });
    }
  });

  /**
   * Handle timer reset
   */
  client.on("RESET", data => {
    const { id } = data;
    console.log(`Client wants to stop timer ${id}`);

    // Get the client's room
    const roomCode = getRooms(client)[0];
    const room = RoomStore.rooms[roomCode];

    // Start the correct timer
    try {
      const timer = room.getTimer(id);
      timer.reset();

      io.in(roomCode).emit("TIMER_SYNC", {
        timestamp: new Date(),
        timers: room.timers
      });
    } catch (e) {
      console.error(e);
      io.in(roomCode).emit("GENERIC_MESSAGE", { message: e.message });
    }
  });

  /**
   * Handle disconnecting clients.
   */
  client.on("disconnecting", data => {
    console.log("Client disconnecting", client.id);
    roomHandler.leaveRooms();
    console.log("Client disconnected");
  });

  /**
   * Stops a given timer.
   */
  client.on("stop", data => {
    const { id } = data;
    console.log(`Stopping timer ${id}`);
    client.emit("stop", { id });
  });
});

server.listen(1338);

// https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
