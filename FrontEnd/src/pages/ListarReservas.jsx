import React, { useState } from "react";
import styles from "../css/Login.module.css";

export default function ListarReservas(){
  const [reservas, setReservas] = useState([
    { numeroMesa: 1, numeroReserva: 101, data: "2025-10-30" },
    { numeroMesa: 2, numeroReserva: 102, data: "2025-11-01" },
    { numeroMesa: 3, numeroReserva: 103, data: "2025-11-02" },
  ]);

  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [novaData, setNovaData] = useState("");

  //  Ver detalhes
  const verDetalhes = (reserva) => {
    setReservaSelecionada(reserva);
    setModoEdicao(false);
  };

  //  Editar reserva (mostra campo de data)
  const editarReserva = (reserva) => {
    setReservaSelecionada(reserva);
    setModoEdicao(true);
    setNovaData(reserva.data);
  };

  //  Salvar edição
  const salvarEdicao = () => {
    setReservas((prev) =>
      prev.map((r) =>
        r.numeroReserva === reservaSelecionada.numeroReserva
          ? { ...r, data: novaData }
          : r
      )
    );
    setModoEdicao(false);
    setReservaSelecionada(null);
  };

  //  Cancelar reserva (remove da lista)
  const cancelarReserva = (numeroReserva) => {
    const confirmar = window.confirm(`Tem certeza que deseja cancelar a reserva nº ${numeroReserva}?`);
    if (confirmar) {
      setReservas((prev) => prev.filter((r) => r.numeroReserva !== numeroReserva));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2> Lista de Reservas</h2>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ backgroundColor: "#f5f5f5" }}>
          <tr>
            <th>Número da Mesa</th>
            <th>Número da Reserva</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.numeroReserva}>
              <td>{reserva.numeroMesa}</td>
              <td>{reserva.numeroReserva}</td>
              <td>{reserva.data}</td>
              <td>
                <button
                  onClick={() => verDetalhes(reserva)}
                  style={{ marginRight: "8px", background: "#1976d2", color: "white", border: "none", padding: "6px 10px", cursor: "pointer" }}
                >
                  Ver Detalhes
                </button>
                <button
                  onClick={() => editarReserva(reserva)}
                  style={{ marginRight: "8px", background: "#fbc02d", color: "black", border: "none", padding: "6px 10px", cursor: "pointer" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => cancelarReserva(reserva.numeroReserva)}
                  style={{ background: "#d32f2f", color: "white", border: "none", padding: "6px 10px", cursor: "pointer" }}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Se uma reserva foi selecionada, mostra abaixo */}
      {reservaSelecionada && !modoEdicao && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>
          <h3>Detalhes da Reserva</h3>
          <p><strong>Mesa:</strong> {reservaSelecionada.numeroMesa}</p>
          <p><strong>Reserva:</strong> {reservaSelecionada.numeroReserva}</p>
          <p><strong>Data:</strong> {reservaSelecionada.data}</p>
          <button onClick={() => setReservaSelecionada(null)}>Fechar</button>
        </div>
      )}

     
      {modoEdicao && reservaSelecionada && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>
          <h3>Editar Reserva #{reservaSelecionada.numeroReserva}</h3>
          <label>
            Nova Data:{" "}
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
            />
          </label>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={salvarEdicao}
              style={{ marginRight: "8px", background: "#4caf50", color: "white", border: "none", padding: "6px 10px", cursor: "pointer" }}
            >
              Salvar
            </button>
            <button onClick={() => setModoEdicao(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}