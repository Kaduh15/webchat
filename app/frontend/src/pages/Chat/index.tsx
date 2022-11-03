import { nanoid } from 'nanoid';
import React, { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { io } from "socket.io-client";
import useUserStore from '../../store/userStore';
import { format } from 'date-fns'
import 'dotenv/config'

const urlSocket = process.env.APP_URL_SOCKET as string

const socket = io(urlSocket);

export type IMessagem = {
  socketId?: string;
  id: string;
  userName: string;
  text: string;
  createdAt: string;
}

const Chat: React.FC = () => {
  const [message, setMessagem] = useState('')
  const [messages, setMessages] = useState<IMessagem[]>([])
  const [isConnect, setIsConnect] = useState(socket.connected)
  const { user } = useUserStore((store) => store)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage: IMessagem = {
        socketId: socket.id,
        id: nanoid(20),
        userName: user.userName,
        text: message.trim(),
        createdAt: new Date().toISOString(),
      }
      setMessages(prev => [...prev, newMessage])
      socket.emit('sendMessage', newMessage)
      setMessagem('')
    }
  }

  const handleChangeInput = (e: FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    setMessagem(newValue)
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnect(true);
      socket.emit('getMessage',{}, (response: IMessagem[]) => {
        setMessages(response)
      })
    });

    socket.on('reciveMessage', (io) => {
      console.log("🚀 ~ file: index.tsx ~ line 55 ~ socket.on ~ io", io)
      console.log('message received')
      if (user.userName !== io.userName){
        setMessages(prev => [...prev, io])
      }
    })

    socket.on('disconnect', () => {
      setIsConnect(false);
    });

  return () => {
    socket.off('connect');
    socket.off('disconnect');
  };
  }, [])

  if (!user.userName) return <Navigate to='/login'/>

  return (
    <div
      className='flex flex-col justify-between items-center w-full h-full'
    >
      <h1>chat</h1>
      {isConnect && <h2>{user.userName}</h2>}
      <ul>
        {messages.map(({id, text, userName, createdAt}) => (
          <li key={Math.random()}>
            <b>{userName}</b> - {text} | {format(new Date(createdAt), 'dd-MMM HH:mm')}
          </li>
        ))}
      </ul>
      <form
        className='w-full flex justify-around p-3 bg-slate-600'
        onSubmit={handleSubmit}
        action=""
      >
        <input
          className='bg-white rounded w-[80%] px-3'
          type="text"
          onChange={handleChangeInput}
          value={message}
        />
        <button
          className='bg-blue-600 p-3 text-white shadow-sm rounded hover:bg-blue-100 hover:text-black'
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Chat;
