import NavBarStore from "../NavbarStore/NavBarStore";
import style from "./sidebarsStore.module.css";
import React, { useEffect, useState } from "react";

const Sidebars = () => {
  const [optionsStatus, setOptionsStatus] = useState("closed");
  const [cartStatus, setCartStatus] = useState("closed");

  const OptionStatus = () => {
    if (optionsStatus == "open") {
      setOptionsStatus("closed");
      setCartStatus("closed");
    } else {
      setOptionsStatus("open");
      setCartStatus("closed");
    }
  };

  const CartStatus = () => {
    if (cartStatus == "open") {
      setCartStatus("closed");
      setOptionsStatus("closed");
    } else {
      setCartStatus("open");
      setOptionsStatus("closed");
    }
  };

  return (
    <div className={style.store}>
      <div
        className={`${style.menuFilters} ${
          optionsStatus === "closed" ? style.open : style.closed
        }`}
      >
        <div className={style.button}>
          <label htmlFor="toggleMenu" className={style.hamburger}>
            <input id="toggleMenu" type="checkbox" onClick={OptionStatus} />
            <svg viewBox="0 0 32 32">
              <path
                className={`${style.line} ${style.lineTop}`}
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className={style.line} d="M7 16 27 16"></path>
            </svg>
          </label>
        </div>
      </div>

      <div
        className={`${style.menuCart} ${
          cartStatus === "closed" ? style.cartOpen : style.cartClosed
        }`}
      >
        <button className={style.button2} onClick={CartStatus}>
          <span className={style.IconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              fill="rgb(130, 220, 147)"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebars;
