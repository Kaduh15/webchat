import React, { FormEvent, useState } from 'react';
import { nanoid } from 'nanoid'
import { io } from "socket.io-client";

const socket = io('http://localhost:3001');

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

type IMessagem = {
  id: string;
  username: string;
  text: string;
  date: Date;
}

const Chat: React.FC = () => {
  const [message, setMessagem] = useState('')
  const [messages, setMessages] = useState<IMessagem[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage: IMessagem = {
        id: nanoid(),
        username: Math.random() > 0.5 ? 'Claudio' : 'Tereza',
        text: message.trim(),
        date: new Date(),
      }
      setMessages(prev => [...prev, newMessage])
      setMessagem('')
    }
  }

  const handleChangeInput = (e: FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    setMessagem(newValue)
}

  return (
    <div
      className='flex flex-col justify-between items-center w-full h-full'
    >
      <h1>chat</h1>
      <ul>
        {messages.map(({id, text}) => (
          <li key={id}>
            {text}
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
