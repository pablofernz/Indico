// Este componente debe renderizar la informacion de cada comida del menú
import { useState } from "react";
import style from "./CardSkeleton.module.css";
import IconLoader from "../../iconLoader/iconLoader";

export default function CardSkeleton() {
  return (
    <div className={style.Content}>
      <div className={style.Img} alt="">
        <IconLoader/>
      </div>
      <div>
        <ul className={style.Text}>
          <h1></h1>
          <p></p>
        </ul>
      </div>
      <div className={style.Prices}>
        <p className={style.Price}></p>

        <button className={style.CartBtn}></button>
      </div>
    </div>
  );
}
