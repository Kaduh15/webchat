import {
  Routes, Route,
} from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';

export default function Rotas() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
  );
}
