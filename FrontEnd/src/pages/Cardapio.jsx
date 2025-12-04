import React, { useState } from "react";
import styles from "../css/Cardapio.module.css";
import Header from "./Header";
import Footer from "./Footer";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Croissant amanteigado",
    price: 6.5,
    category: "Salgado",
    description: "Croissant folhado, crocante por fora e macio por dentro.",
    img: "https://blumskaffee.lojazap.com/_core/_uploads/24987/2024/06/103607062412dk9a9fia.webp",
  },
  {
    id: 2,
    name: "Pão de queijo",
    price: 3.5,
    category: "Salgado",
    description: "Pão de queijo quentinho, recheado com queijo Minas tradicional.",
    img: "https://i0.wp.com/essareceitafunciona.com.br/wp-content/uploads/2022/07/Pao-de-queijo-Essa-Receita-Funciona-9.jpg?w=1200&ssl=1",
  },
  {
    id: 3,
    name: "Bolo de chocolate (fatia)",
    price: 8.0,
    category: "Doce",
    description: "Fatia generosa de bolo de chocolate com cobertura cremosa.",
    img: "https://cdn.casaeculinaria.com/wp-content/uploads/2022/10/04101905/Bolo-de-chocolate-2-768x512.webp",
  },
];

export default function Cardapio() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = ["Todos", ...new Set(MENU_ITEMS.map(item => item.category))];

  const filtered = MENU_ITEMS.filter(item => {
    const matchesQuery = (item.name + " " + item.description)
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = category === "Todos" || item.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className={styles["page"]}>
      <Header />

      <main className={styles["menu-container"]}>
        
 
        <div className={styles["menu-controls"]}>
          <input
            className={styles["menu-search"]}
            placeholder="Buscar item..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className={styles["menu-select"]}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>


        <section className={styles["menu-grid"]}>
          {filtered.map(item => (
            <article className={styles["menu-card"]} key={item.id}>
              <img src={item.img} alt={item.name} />

              <div className={styles["menu-card-body"]}>
                <div className={styles["menu-card-header"]}>
                  <div>
                    <h3 className={styles["menu-card-title"]}>{item.name}</h3>
                    <p className={styles["menu-card-category"]}>{item.category}</p>
                  </div>

                  <p className={styles["menu-card-price"]}>
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                <p className={styles["menu-card-description"]}>
                  {item.description}
                </p>

                <div className={styles["menu-buttons"]}>
                  <button
                    className={styles["menu-btn-add"]}
                    onClick={() => alert(`${item.name} adicionado ao pedido!`)}
                  >
                    Adicionar
                  </button>

                  <button
                    className={styles["menu-btn-details"]}
                    onClick={() =>
                      alert(`Detalhes: ${item.name} — ${item.description}`)
                    }
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
