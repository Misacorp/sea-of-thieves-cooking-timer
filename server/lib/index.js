import http from "http";
import socketIo from "socket.io";

const server = http.createServer();
const io = socketIo(server);

// This crashes if client is in no rooms
const getClientRooms = client => {
  console.log("client.rooms:", client.rooms);
  Object.keys(client.rooms).forEach(roomId =>
    emitLeaveRoom(roomId, "test client id")
  );
  return [];
};

// Emit a "Client left room" event to everyone in a specific room.
const emitLeaveRoom = (roomId, nickname) => {
  // Don't emit a 'client left' event when it leaves the initial default room.
  if (roomId.length === 4) {
    io.to(roomId).emit("USER_LEFT", { nickname, timestamp: new Date() });
  }
};

io.on("connection", client => {
  const clients = io.sockets.clients();
  console.log('Clients:', Object.keys(clients.connected));

  /**
   * Assign client to a room on their request.
   * Notify room members of the new client.
   */
  client.on("JOIN_ROOM", data => {
    const { nickname, roomCode } = data;
    const currentRooms = getClientRooms(client);

    // Leave any rooms the client is currently in
    client.leaveAll();

    // Loop through all rooms the client is connected to
    for (let i = 0; i < currentRooms.length; i += 1) {
      // Emit an event saying the user left
      const roomId = currentRooms[i][0];
      emitLeaveRoom(roomId, nickname);
    }

    // Join new room and broadcast joined event.
    client.join(roomCode);
    io.to(roomCode).emit("USER_JOINED", { nickname, timestamp: new Date() });
  });

  client.on("CREATE_ROOM", data => {
    console.log("Client wants to CREATE room", data);
  });

  /**
   * Starts a given timer.
   */
  client.on("start", data => {
    const { id, food } = data;
    console.log(`Starting timer ${id} with ${food}`);
    client.emit("start", { date: new Date(), id: data.id, food: data.food });
  });

  /**
   * Stops a given timer.
   */
  client.on("stop", data => {
    const { id } = data;
    console.log(`Stopping timer ${id}`);
    client.emit("stop", { id });
  });

  client.on("disconnecting", data => {
    // Loop through all rooms the client is connected to
    const currentRooms = getClientRooms(client);
    for (let i = 0; i < currentRooms.length; i += 1) {
      // Emit an event saying the user left
      const roomId = currentRooms[i][0];
      emitLeaveRoom(roomId, client.id);
    }
    console.log("Client disconnected");
  });
});

server.listen(1338);

// https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
