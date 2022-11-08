import {
  Routes, Route,
} from 'react-router-dom';

import Chat from './pages/Chat';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

export default function Rotas() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
  );
}
