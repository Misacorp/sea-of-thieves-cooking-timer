const server = require("http").createServer();
const io = require("socket.io")(server);
io.on("connection", client => {
  console.log("Client connected");

  client.on("start", data => {
    const { id, food } = data;
    console.log(`Starting timer ${id} with ${food}`);
    client.emit('start', { date: new Date(), id: data.id, food: data.food });
  });

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(1338);

// https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
