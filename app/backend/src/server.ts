import express from 'express';
import { Server } from "socket.io";
import cors from 'cors';
import http from 'http';
import 'dotenv/config'

export type IMessagem = {
  socketId?: string;
  id: string;
  userName: string;
  text: string;
  createdAt: Date;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

const messagens: IMessagem[] = []

const PORT = process.env.PORT

app.use(cors({
  origin: '*',
  methods: '*',
  credentials:true,
}))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello, world!'
  });
});

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on('sendMessage', (message) => {
    console.log(`send - ${message.userName} | ${message.text}`)
    messagens.push(message)
    socket.broadcast.emit('reciveMessage', message);
  })

  socket.on('disconnect', () => {
    console.log(`a user disconnet: ${socket.id}`);
  })

  socket.on('getMessage', (data, callback) => {
    callback(messagens)
  })
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

