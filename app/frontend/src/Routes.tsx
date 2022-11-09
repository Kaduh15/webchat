import {
  Routes, Route,
} from 'react-router-dom';

import Chat from './pages/Chat';
import ChatGlobal from './pages/ChatGlobal';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

export default function Rotas() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatGlobal />} />
        <Route path="/chat/:roomId" element={<Chat />} />
      </Routes>
  );
}
