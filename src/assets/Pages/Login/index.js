import React, {useState} from "react"
import api from '../../services/Api'
import {useHistory} from 'react-router-dom'
import "./style.css"

import logo from "../../img/logo.svg";
import padlock from "../../img/padlock.png";
export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  async function login(e){
    e.preventDefault();
    const data= {
      userName,
      password,
    }
    try {
      const response = await api.post('api/AuthControllers/v1/signin', data)
      localStorage.setItem('userName', userName)
      localStorage.setItem('acessToken', response.data.acessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      history.push('/books')
    } catch (error) {
      alert('Falha no login')
    }
  }
    return (
      <div className="login-container">
        <form onSubmit={login}>
            <img src={logo} />
            <h1>Acess your Account</h1>
            <input type="text"
              placeholder="Nome"  value={userName}
              onChange={e=> setUserName(e.target.value)} />
            <input type="password" placeholder="Password"
              value={password} onChange={e=> setPassword(e.target.value)} />
            <button type="submit" className="button">Login</button>
        </form>
        <img src={padlock} className="img"/>
      </div>
    );
  }