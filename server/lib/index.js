import http from "http";
import socketIo from "socket.io";

import getRooms from "./getClientRooms";
import leaveRooms from "./handlers/leaveRooms";
import RoomStore from "./RoomStore";
import createRoomHandler from "./roomHandler";

const server = http.createServer();
const io = socketIo(server);

io.on("connection", client => {
  // Debug client list
  const clients = io.sockets.clients();
  console.log("[NEW CONNECTION] Clients:", Object.keys(clients.connected));

  // Initialize a roomHandler
  const roomHandler = createRoomHandler(io, client);

  /**
   * Handle creating a room.
   */
  client.on("CREATE_ROOM", data => {
    roomHandler.createRoom(data);
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
    leaveRooms(client);
  });

  /**
   * Handle timer start.
   */
  client.on("START", data => {
    const { id, food } = data;
    console.log(`Client wants to start timer ${id} with ${food}`);

    // Get the client's room
    const roomCode = getRooms(client)[0];
    const room = RoomStore.getRoom(roomCode);

    console.log(roomCode, room);

    // Start the correct timer
    try {
      const timer = room.getTimer(id);
      timer.start(food);

      const { nickname } = room.getMemberById(client.id);
      const foodName = timer.foodName.toLowerCase();

      io.in(roomCode).emit("TIMER_SYNC", {
        timestamp: new Date(),
        timers: room.timers,
        message: `${nickname} started cooking ${foodName}`
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

    // Reset the correct timer
    try {
      const timer = room.getTimer(id);
      const foodName = timer.foodName.toLowerCase(); // Get food name before resetting it.
      timer.reset();

      const { nickname } = room.getMemberById(client.id);

      io.in(roomCode).emit("TIMER_SYNC", {
        timestamp: new Date(),
        timers: room.timers,
        message: `${nickname} reset ${foodName}`
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
    leaveRooms(client);
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

const PORT = process.env.PORT || 1338;
server.listen(PORT);

// https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
