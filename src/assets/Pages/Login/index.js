import React from "react"
import "./style.css"
import logo from "../../img/logo.svg";
import padlock from "../../img/padlock.png";
export default function Login() {
    return (
      <div className="login-container">
        <form action="">
            <img src={logo} />
            <h1>Acess your Account</h1>
            <input type="text" name="nome" id="nome" placeholder="Nome"/>
            <input type="password" name="password" id="password" placeholder="Password"/>
            <button type="submit" className="button">Login</button>
        </form>
        <img src={padlock} className="img"/>
      </div>
    );
  }