import React from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
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
          </ul>
        </div>
      </nav>
      
      {/* <section className={style.inicio} id="Home">
        Inicio
      </section>
      <section id="Reviews">Reviews</section>
      <section id="Register">Sección de registro</section> */}

      {/* <div className={style.button}>
        <a href="#Home">
          <svg>
            <svg
              className={style.arrow}
              data-name="1-Arrow Up"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              height={25}
            >
              <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
            </svg>
          </svg>
        </a>
      </div> */}
    </div>
  );
};

export default NavBar;
