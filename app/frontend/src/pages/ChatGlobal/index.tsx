import { nanoid } from 'nanoid';
import React, { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import { format } from 'date-fns';
import useSocketStore from '../../store/useSocketStore';

export type IMessagem = {
  socketId?: string;
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

const ChatGlobal: React.FC = () => {
  const [message, setMessagem] = useState('');
  const [messages, setMessages] = useState<IMessagem[]>([]);
  const { user } = useUserStore((store) => store);
  const { socket } = useSocketStore((store) => store);

  const myMessageCSS = (userName: string) => {
    if (
      user.userName.toLocaleLowerCase().trim() ===
      userName.toLocaleLowerCase().trim()
    )
      return 'self-end bg-emerald-500 flex flex-col justify-start text-black p-2 text-end';

    return 'self-start bg-blue-500 flex flex-col justify-start text-black p-2 text-start';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: IMessagem = {
        socketId: socket.id,
        id: nanoid(20),
        author: user.userName,
        text: message.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      socket.emit('sendMessage', newMessage);
      setMessagem('');
    }
  };

  const handleChangeInput = (e: FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    setMessagem(newValue);
  };

  useEffect(() => {
    socket.on('reciveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('reciveMessage')
    };
  }, []);

  if (!user.userName) return <Navigate to='/login'/>

  return (
    <div className="flex flex-col justify-between items-center w-full h-screen">
      <header className="flex flex-col items-center p-3 justify-center w-full bg-emerald-600 shadow-lg">
        <h1 className="text-xl font-bold text-white shadow-inner capitalize ">
          Chat
        </h1>

        <h2 className="self-end shadow-2xl font-bold text-white text-2xl capitalize ">
          {user.userName}
        </h2>
      </header>
      <ul className="flex flex-col justify-start h-full w-full p-3 px-5 gap-2 overflow-auto scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin">
        {messages.map(({ id, text, author, createdAt }) => (
          <li
            className={`${myMessageCSS(author)} min-w-[200px] rounded`}
            key={id}
          >
            <b className="capitalize text-sm">{author}</b>
            <p className="text-white font-medium text-xl">{text}</p>
            <span>{format(new Date(createdAt), 'HH:mm')}</span>
          </li>
        ))}
      </ul>
      <form
        className="w-full flex justify-around p-3 bg-emerald-600"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-white rounded w-[80%] px-3"
          type="text"
          onChange={handleChangeInput}
          placeholder="Digite sua Mensagem..."
          value={message}
        />
        <button
          className="bg-blue-600 p-3 text-white shadow-sm rounded hover:bg-blue-100 hover:text-black"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatGlobal;
