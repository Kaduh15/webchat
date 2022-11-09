import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useUserStore, { IUser } from '../../store/userStore';
import useSocketStore from '../../store/useSocketStore';

const HomePage: React.FC = () => {
  const [userOn, setUserOn] = useState<IUser[]>([]);
  const { user } = useUserStore((store) => store);
  const { socket } = useSocketStore((store) => store);

  useEffect(() => {
    if (!!user.userName.trim())
      socket.emit('addUser', { userName: user.userName });

    socket.on('getUserOn', (data: IUser[]) => {
      const userOnline =data.filter(({userName}) => userName !== user.userName)
      console.log("🚀 ~ file: index.tsx ~ line 17 ~ socket.on ~ userOnline", userOnline)
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
            {userOn.map(({ id, userName }, index) => (
              <li
                key={id}
                className={`${
                  index % 2 === 0 ? 'bg-blue-400' : 'bg-blue-600'
                } text-center font-mono text-xl text-white`}
              >
                {userName}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Link
        className="bg-green-900 px-2 py-1 text-white font-mono shadow-lg text-center"
        to="/chat"
      >
        ir para Chat
      </Link>
    </main>
  );
};

export default HomePage;
