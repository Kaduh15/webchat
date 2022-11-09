import { io } from 'socket.io-client';
import create from 'zustand';

const urlSocket = import.meta.env.VITE_URL_SOCKET;

const socketIo = io(urlSocket);

export interface ISocketStore {
  socket: typeof socketIo;
}

const useSocketStore = create<ISocketStore>((set) => ({
  socket: socketIo
}));

export default useSocketStore;
