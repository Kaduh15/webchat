import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputUserName, setinputUserName] = useState('');
  const { setUserName } = useUserStore((store) => store);

  const borderInput = () => {
    if (!inputUserName.trim()) return 'border-gray-300';

    if (!buttonDisabled) return 'border-green-500';

    return 'border-red-500';
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setinputUserName(e.currentTarget.value);

    if (e.currentTarget.value.length > 3) {
      return setButtonDisabled(false);
    }

    setButtonDisabled(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserName(inputUserName);
    navigate('/');
  };

  return (
    <main className="flex justify-center items-center h-full bg-gradient-to-br from-emerald-400 to-emerald-900">
      <form
        className="flex flex-col items-center p-10 bg-white rounded-xl gap-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-3xl text-gray-800 font-mono p-1 rounded border-b-2">
          Login
        </h1>
        <input
          id="login"
          className={`p-1 rounded shadow-lg border-2 ${borderInput()} focus:outline-0`}
          type="text"
          value={inputUserName}
          onChange={handleChangeInput}
          placeholder="insira seu nome"
        />
        <button
          className="disabled:bg-red-800 disabled:text-white disabled:shadow-none bg-emerald-900 text-white px-3 py-1 rounded shadow-inner font-bold"
          type="submit"
          disabled={buttonDisabled}
        >
          Fazer Login
        </button>
      </form>
    </main>
  );
};

export default Login;
