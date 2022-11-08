import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import "dotenv/config";

export type IMessagem = {
  socketId?: string;
  id: string;
  userName: string;
  text: string;
  createdAt: Date;
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

type TUser = {
  id: string;
  userName: string;
};

const messagens: IMessagem[] = [];
let usersOn: TUser[] = [];

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, world!",
  });
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('sendMessage', (messagen) => {
    console.log(`📩: ${messagen.author} - ${messagen.text}`)
    socket.broadcast.emit('reciveMessage', messagen);
  })

  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} user disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
