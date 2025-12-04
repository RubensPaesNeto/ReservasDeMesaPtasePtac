import React, { useState } from "react";
import styles from "../css/ConsultarMesas.module.css";

export default function ConsultarMesas() {
  const [mesas, setMesas] = useState([]);
  const [mensagem, setMensagem] = useState("");

  async function consultarMesas(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/mesa/mesas"); 

      if (!response.ok) {
        throw new Error("Erro ao consultar mesas");
      }

      const dados = await response.json();
      setMesas(dados.mesas);
      setMensagem("");
      console.log("teste")
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro ao consultar mesas. Tente novamente.");
    }
  }

  function limparCampos() {
    setMesas([]);
    setMensagem("");
  }

  return (
    <div className={styles["consultar-container"]}>
      <h2>Consultar Mesas</h2>

      <form onSubmit={consultarMesas} className={styles["form-container"]}>
        <div className={styles["button-group"]}>
          <button type="submit" className={styles["btn-consultar"]}>
            Consultar
          </button>
          <button type="button" onClick={limparCampos} className={styles["btn-limpar"]}>
            Limpar
          </button>
        </div>
      </form>

      {mensagem && <p className={styles["mensagem-erro"]}>{mensagem}</p>}

      {mesas.length > 0 && (
        <table className={styles["tabela-mesas"]}>
          <thead>
            <tr>
              <th>Número da Mesa</th>
              <th>Capacidade</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa) => (
              <tr key={mesa.id}>
                <td>{mesa.codigo}</td>
                <td>{mesa.n_lugares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
