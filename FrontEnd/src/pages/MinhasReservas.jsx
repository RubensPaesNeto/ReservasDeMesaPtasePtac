import React, { useState } from "react";
import styles from "../css/MinhasReservas.module.css";
import Header from "./Header";
import Footer from "./Footer";

export default function MinhasReservas() {
  const [mesa, setMesa] = useState("");
  const [reserva, setReserva] = useState("");
  const [data, setData] = useState("");
  const [resultado, setResultado] = useState(null);

  // 🔸 OBJETO FICTÍCIO COM 5 RESERVAS
  const reservas = [
    { mesa: "1", reserva: "100", data: "2025-11-30", nome: "Carlos Silva" },
    { mesa: "2", reserva: "101", data: "2025-12-01", nome: "Ana Souza" },
    { mesa: "3", reserva: "102", data: "2025-12-05", nome: "João Pedro" },
    { mesa: "4", reserva: "103", data: "2025-12-10", nome: "Mariana Alves" },
    { mesa: "5", reserva: "104", data: "2025-12-15", nome: "Fernanda Lima" },
  ];

  const consultar = () => {
    // verifica por qualquer combinação dos campos preenchidos
    const achado = reservas.find((r) => {
      return (
        (mesa === "" || r.mesa === mesa) &&
        (reserva === "" || r.reserva === reserva) &&
        (data === "" || r.data === data)
      );
    });

    setResultado(achado || "não encontrado");
  };

  return (
    <div className={styles["page-wrapper"]}>
      <Header />

      <div className={styles["container"]}>
        <h1 className={styles["titulo"]}>Minhas Reservas</h1>

        <div className={styles["card"]}>
          <div className={styles["campo"]}>
            <label>Nº da mesa</label>
            <input
              type="text"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
            />
          </div>

          <div className={styles["campo"]}>
            <label>Número da reserva</label>
            <input
              type="text"
              value={reserva}
              onChange={(e) => setReserva(e.target.value)}
            />
          </div>

          <div className={styles["campo"]}>
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <button className={styles["botao"]} onClick={consultar}>
            Consultar
          </button>

          {/* 🔸 Resultado da busca */}
          {resultado && (
            <div style={{ marginTop: "15px", color: "#6b2d12", fontWeight: "bold" }}>
              {resultado === "não encontrado" ? (
                <p>❌ Reserva não encontrada</p>
              ) : (
                <p>
                  ✔ Mesa {resultado.mesa} — Reserva {resultado.reserva}<br />
                  Cliente: {resultado.nome}<br />
                  Data: {resultado.data}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className={styles["footer-fix"]}>
        <Footer />
      </footer>
    </div>
  );
}
