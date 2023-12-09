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
            <img
              className={style.logoImg}
              src="https://i.ibb.co/4JNx6NT/logo-bold-2.png"
              alt="logo"
            />
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
              <a className={style.Login} onClick={() => navigate("/login")}>
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

              <ul
                className={`${style.menuSmall} ${
                  isOpen === "open" ? style.open : style.closed
                }`}
              >
                <a
                  href="#Menu"
                  className={style.btnsnav2}
                  onClick={handleclick}
                >
                  Menú
                </a>
                <a
                  href="#Reviews"
                  className={style.btnsnav2}
                  onClick={handleclick}
                >
                  Reseñas
                </a>
                <a
                  href="#Register"
                  className={style.btnsnav2}
                  onClick={handleclick}
                >
                  Regístrate
                </a>
                <a className={style.Login2} onClick={() => navigate("/login")}>
                  Inicia Sesión
                </a>
              </ul>

              {/* {isOpen === "open" ? (
                <div className={style.menuSmallContainer}>
                  <ul className={style.menuSmall}>
                    <a href="#Menu" className={style.btnsnav2}>
                      Menú
                    </a>
                    <a href="#Reviews" className={style.btnsnav2}>
                      Reseñas
                    </a>
                    <a href="#Register" className={style.btnsnav2}>
                      Regístrate
                    </a>
                    <a
                      className={style.Login2}
                      onClick={() => navigate("/registro")}
                    >
                      Inicia Sesión
                    </a>
                  </ul>
                </div>
              ) : null} */}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
