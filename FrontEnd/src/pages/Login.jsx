import React, { useState } from "react";
import styles from "../css/Login.module.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMensagem("Login realizado com sucesso!");
      } else {
        setMensagem(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      setMensagem("Erro de conexão.");
    }
  }

  return (
    <>
      <div className={styles["page-wrapper"]}>
        <Header />

        <div className={styles["login-container"]}>
          <h2>Login</h2>

          <form onSubmit={loginUser} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            
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

          {mensagem && <p>{mensagem}</p>}
        </div>

        <footer className={styles["footer-fix"]}>
          <Footer />
        </footer>
      </div>
    </>
  );
}
