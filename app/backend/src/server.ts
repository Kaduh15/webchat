import express from "express";
import { Server, Socket } from "socket.io";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

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

const addUserOn = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, { userName }: TUser) => {
  const hasUserOn = usersOn.some(({ id }) => id === socket.id);

    if (!hasUserOn && !! userName.trim())
      usersOn.push({ id: socket.id, userName: userName });
}

const removeUserOn = (id: string) => {
  usersOn = usersOn.filter((user) => {
    console.log(
      "🚀 ~ file: server.ts ~ line 49 ~ removeUserOn ~ usersOn",
      usersOn
    );
    return user.id !== id;
  });
};

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("addUser", ({ userName }) => {
    addUserOn(socket, { userName })
    io.emit("getUserOn", usersOn);
  });

  socket.emit("getUserOn", usersOn);

  socket.on("sendMessage", (messagen) => {
    console.log(`📩: ${messagen.author} - ${messagen.text}`);
    socket.broadcast.emit("reciveMessage", messagen);
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
