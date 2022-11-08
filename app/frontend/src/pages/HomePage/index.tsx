import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useUserStore, { IUser } from '../../store/userStore';
import useSocketStore from '../../store/useSocketStore';

const HomePage: React.FC = () => {
  const [userOn, setUserOn] = useState<IUser[]>([]);
  const { user } = useUserStore((store) => store);
  const { socket } = useSocketStore((store) => store);

  useEffect(() => {
    socket.emit('onUser', { userName: user.userName });

    socket.on('usersOn', (data) => {
      console.log('🚀 ~ file: home.tsx ~ line 12 ~ socket.on ~ data', data);
      setUserOn(data);
    });

    return () => {};
  }, []);

  if (!user.userName) return <Navigate to="/login" />;
  return (
    <>
      <header>
        <h1>Webchat</h1>
      </header>
      <section id="users-on" className="bg-blue-200">
        <ul>
          {userOn.map(({ id }) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </section>
      <Link to="/chat">Chat</Link>
    </>
  );
};

export default HomePage;
