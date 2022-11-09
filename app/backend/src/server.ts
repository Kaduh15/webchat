import express from "express";
import { Server, Socket } from "socket.io";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type IMessagem = {
  socketId?: string;
  id: string;
  author: string;
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
  id?: string;
  userName: string;
};

type TRoom = {
  id: string;
  members: string[];
  messages: IMessagem[];
};

const messages: IMessagem[] = [];
let usersOn: TUser[] = [];
const roomsChat: TRoom[] = [];

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

  const addUserOn = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    { userName }: TUser
    ) => {
      const hasUserOn = usersOn.some(({ id }) => id === socket.id);

      if (!hasUserOn && !!userName.trim())
      usersOn.push({ id: socket.id, userName: userName });
    };

    const removeUserOn = (id: string) => {
      usersOn = usersOn.filter((user) => {
        return user.id !== id;
  });
};

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("addUser", ({ userName }) => {
    addUserOn(socket, { userName });
    io.emit("getUserOn", usersOn);
  });

  socket.on("sendMessage", (message) => {
    console.log(`📩: ${message.author} - ${message.text}`);
    socket.broadcast.emit("reciveMessage", message);
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    const hasRoom = roomsChat.some(({ id }) => id === roomId);
    const idUsers = roomId.split('+');
    const usersRoom = usersOn.filter(user => idUsers.includes(user.id))
      .map(({userName}: TUser) => userName);

    if (!hasRoom) {
      roomsChat.push({
        id: roomId,
        members: usersRoom,
        messages: [],
      });
    }
    const room = roomsChat.find(({ id }) => id === roomId);
    io.sockets.in(roomId).emit("connectToRoom", {messagens: room?.messages || [], members: room?.members});
  });

  socket.on("sendMessageRoom", (message) => {
    console.log(
      `📩👥: ${message.author} - ${message.text} | ${message.roomId.slice(0, 5)}`
      );
      const room = roomsChat.find(({ id }) => id === message.roomId);
    if (room) {
      room.messages.push(message);
    }
    io.sockets.in(message.roomId).emit("reciveMessageRoom", message);
  });

  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} user disconnected`);
    removeUserOn(socket.id);
    io.emit("getUserOn", usersOn);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
