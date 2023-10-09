import React, { useState } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState("closed");

  const handleclick = () => {
    if (isOpen === "closed") {
      setIsOpen("open");
      console.log("Open");
    } else {
      setIsOpen("closed");
      console.log("Closed");
    }
  };
  return (
    <div>
      <nav>
        <div className={style.navbar}>
          <div className={style.logo}>
            <a>Indico.</a>
          </div>

          <ul className={style.menu}>
            <li className={style.btnsnav}>
              <a href="#Menu">Menú</a>
            </li>

            <li className={style.btnsnav}>
              <a href="#Reviews">Reseñas</a>
            </li>

            <li>
              <a>|</a>
            </li>

            <li className={style.btnsnav}>
              <a href="#Register">Registrate</a>
            </li>

            <li>
              <a className={style.Login} onClick={() => navigate("/registro")}>
                Inicia Sesión
              </a>
            </li>
            <div className={style.navbar2}>
              <label className={style.burger} htmlFor="burger">
                <input type="checkbox" onClick={handleclick} id="burger" />
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
