const http = require("http");
const app = require("./index");
const winston = require("winston");
const config = require("config");

const host = process.env.HOSTNAME || config.get("SERVER.HOSTNAME");
const port = process.env.PORT || config.get("SERVER.PORT");

const server = http.createServer(app);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  winston.info("Listening on " + bind);
}

server.listen(port, host, () => {
  console.log(`Node.js API server is listening on http://${host}:${port}/`);
});
server.on("error", onError);
server.on("listening", onListening);
module.exports = server;
