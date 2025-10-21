import React, { useState } from "react";
import "../css/CadastroPessoa.module.css";


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

  const novaPessoa = { nome, email, password };

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaPessoa)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar pessoa');
      }

      const dados = await response.json();
      setMensagem(`Pessoa ${dados.nome} cadastrada com sucesso!`);

      // Limpar o formulário
      setNome('');
      setEmail('');
      setPassword('')
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro ao cadastrar. Tente novamente.');
    }
  };
  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}