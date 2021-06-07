import express from "express";
import http from "http";
import { Server } from "socket.io";
import events from "events";
import cors from "cors";

const em = new events.EventEmitter();

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("user connected");

  em.on("qr-read", (id) => {
    socket.emit("id", id);
  });
});

const PORT = process.env.PORT ?? 4000;

app.get("/ping", (req, res) => {
  res.send("PONG!");
});

app.get("/:id", (req, res) => {
  res.send(
    `Hello, I'm the server, and I'm running on ${req.hostname}:${PORT}, your QR code reads: ${req.params.id}`
  );
});

app.get("/send/:id", (req,res) => {
  em.emit("qr-read", req.params.id);
  res.sendStatus(200);
})

server.listen(+PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
