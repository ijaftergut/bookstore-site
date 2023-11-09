import React, { useState } from 'react';
import api from './api';

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
    }
    catch(ex){
      console.log(ex.response.data);
    }
  }
  const newUser = async(ev) => {
    try {
      const user = {password, username, is_admin: false, is_vip: false}
      await api.createUser(user)
      _login(ev)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <form onSubmit={ _login }>
      <input
        placeholder='username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
      <button type='button' onClick={ev => newUser(ev)} disabled={!username || !password}>Create New User</button>
    </form>
  );
}

export default Login;
