// Este componente debe renderizar la informacion de cada comida del menú
import { useEffect, useState } from "react";
import style from "./SkeletonList.module.css";
import IconLoader from "../../../../../Components/iconLoader/iconLoader";

export default function SkeletonList({
  id,
  title,
  image,
  description,
  price,
  discount,
  className,
}) {
  const [isAdded, setIsAdded] = useState(false);

  const AddHandler = () => {
    if (isAdded === false) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  };
  return (
    <div className={className}>
      <div className={style.Content}>
        <div className={style.Img}>
          <IconLoader />
        </div>
        <div className={style.TextAndPrices}>
          <div className={style.h1}>
            joooooooooooooooooooooooooooooooooooooooooooooooo
          </div>
          <div className={style.h2}></div>
          <div className={style.h3}></div>
          <div className={style.Prices}>
            <p className={style.Price}></p>
          </div>
        </div>
        <div className={style.buttonContainer}>
          <div className={style.buttonSeparator}></div>
          <button className={style.CartBtn}></button>
        </div>
      </div>
    </div>
  );
}
