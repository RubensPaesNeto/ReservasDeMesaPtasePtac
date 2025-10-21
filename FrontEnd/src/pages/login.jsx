import React, { useState } from "react";
import "../css/Login.module.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  async function loginUser(e) {
    e.preventDefault();
    try {
       const res = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
      localStorage.setItem('token', data.token);
        setMessage(`Login sucesso!`);

      } else {
        setMessage(data.message || 'Erro no login');
      }
      console.log("Login:", { email, password });
      alert("Login enviado (simulação).");
    } catch (err) {
      alert("Erro ao fazer login." + err);
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}