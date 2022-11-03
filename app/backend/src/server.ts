import express from 'express';
import { Server } from "socket.io";
import cors from 'cors';
import http from 'http';
import 'dotenv/config'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

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
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});