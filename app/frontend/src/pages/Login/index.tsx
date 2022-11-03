import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [inputUserName, setinputUserName] = useState('')
  const { setUserName } = useUserStore(store => store)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setinputUserName(e.currentTarget.value);
    if (inputUserName.length > 3) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserName(inputUserName);
    navigate('/')
  }

  return (
  <form onSubmit={handleSubmit}>
    <h1>Login</h1>
    <input
      type="text"
      value={inputUserName}
      onChange={handleChangeInput}
      placeholder='insira seu nome'
    />
    <button
      className='disabled:bg-slate-700 disabled:text-white bg-emerald-600 text-white px-3 py-1 rounded'
      type='submit'
      disabled={buttonDisabled}
    >
      Fazer Login
    </button>
  </form>
  );
}

export default Login;
