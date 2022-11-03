import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [userName, setUserName] = useState('')

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
    if (userName.length > 3) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }

  return (
  <form >
    <h1>Login</h1>
    <input
      type="text"
      value={userName}
      onChange={handleChangeInput}
      placeholder='insira seu nome'
    />
    <button
      type='submit'
      disabled={buttonDisabled}
      onClick={ () => navigate('/')}
    >
      Fazer Login
    </button>
  </form>
  );
}

export default Login;
