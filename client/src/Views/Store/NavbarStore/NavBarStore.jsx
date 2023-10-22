import React, { useState } from "react";
import style from "./NavBarStore.module.css";

const NavBarStore = () => {
  const [inputValue, setInputValue] = useState("")

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value)
  };

  const handleSearch = () => {
    console.log(inputValue);
  };
  return (
    <div>
      <nav>
        <div className={style.navbar}>
          <div className={style.menu}>
            <button className={style.button}>Categorias</button>
            <button className={style.button}>Filtros</button>
            <input
              type="text"
              className={style.input}
              placeholder="Buscar"
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event);
                }
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarStore;
