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
          <h1 className={style.h1}>
            joooooooooooooooooooooooooooooooooooooooooooooooo
          </h1>
          <h2></h2>
          <h3></h3>
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
