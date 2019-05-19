const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", client => {
  console.log("Client connected");

  /**
   * Assign client to a room on their request.
   * Notify room members of the new client.
   */
  client.on('JOIN_ROOM', data => {
    const { nickname, roomCode } = data;

    console.log(`${nickname} wants to join room ${roomCode}`);
    client.join(roomCode);
    io.to(roomCode).emit('USER_JOINED', { nickname, timestamp: new Date() });
  });

  client.on('CREATE_ROOM', data => {
    console.log('Client wants to CREATE room', data);
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

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(1338);

// https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
