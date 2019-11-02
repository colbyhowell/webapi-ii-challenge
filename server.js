const express = require("express");
const postRouter = require("./data/postRouter");

const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send("Server is listening on port 4000");
});

module.exports = server;
