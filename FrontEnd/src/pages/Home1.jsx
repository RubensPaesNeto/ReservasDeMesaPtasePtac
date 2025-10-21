import React from "react";
import "../css/Home.module.css";


export default function Home() {
  return (
    <div className="home-container">
      <h1>ReservaFácil 🍽️</h1>
      <p>Bem-vindo ao seu sistema de reserva de mesas!</p>

      <div className="buttons">
        <button>Login</button>
        <button a="">Cadastro</button>
        <button>Perfil</button>
        <button>Atualizar Perfil</button>
        <button>Cadastrar Mesas</button>
        <button>Buscar Mesas</button>
        <button>Reservar Mesas</button>
        <button>Minhas Reservas</button>
      </div>
    </div>
  );

}