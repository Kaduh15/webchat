import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useUserStore, { IUser } from '../../store/userStore';
import useSocketStore from '../../store/useSocketStore';
import { TIds } from '../../types';

const HomePage: React.FC = () => {
  const [userOn, setUserOn] = useState<IUser[]>([]);
  console.log("🚀 ~ file: index.tsx ~ line 10 ~ userOn", userOn)
  const { user } = useUserStore((store) => store);
  const { socket } = useSocketStore((store) => store);

  const createUrlId = (ids: TIds) => {
    ids.sort();
    return ids.join('+');
  };

  useEffect(() => {
    if (!!user.userName.trim())
      socket.emit('addUser', { userName: user.userName });

    socket.on('getUserOn', (data: IUser[]) => {
      const userOnline = data.filter(
        ({ userName }) => userName !== user.userName,
      );
      setUserOn(userOnline);
    });

    return () => {
      socket.off('getUserOn');
    };
  }, []);

  if (!user.userName) return <Navigate to="/login" />;
  return (
    <main className="flex flex-col justify-between h-full w-full">
      <header className="flex items-center justify-around h-10 bg-emerald-400">
        <h1 className="font-bold text-white border-b-4 rounded border-t-4">
          Webchat
        </h1>
      </header>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h2>Usuarios Online</h2>
        <section
          id="users-on"
          className="h-full w-full overflow-auto bg-blue-400"
        >
          <ul className="w-full">
            {!!userOn.length ? userOn.map(({ id, userName }, index) => (
              <li
                key={id}
                className={`${
                  index % 2 === 1 ? 'bg-blue-400' : 'bg-blue-600'
                } text-center font-mono text-xl text-white py-2`}
              >
                <Link
                  className="flex justify-center items-center gap-5"
                  to={`chat/${createUrlId([id, socket.id])}`}
                >
                  <img
                    className="h-24 w-24 rounded-full border-2 "
                    src={`https://avatars.dicebear.com/api/bottts/${userName}.svg`}
                  />
                  {userName}
                </Link>
              </li>
            )) : <li
            className='text-center p-5'
            >Não tem mais niguem Online 🙁</li>}
          </ul>
        </section>
      </div>
      <Link
        className="bg-green-900 px-2 py-1 text-white font-mono shadow-lg text-center"
        to="/chat"
      >
        ir para Chat Global
      </Link>
    </main>
  );
};

export default HomePage;
