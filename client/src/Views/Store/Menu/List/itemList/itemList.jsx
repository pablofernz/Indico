// Este componente debe renderizar la informacion de cada comida del menú
import { useEffect, useState } from "react";
import style from "./itemList.module.css";

export default function ItemList({
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
        {discount ? (
          <div className={style.Discount}>{`-${discount}%`}</div>
        ) : null}

        <img className={style.Img} src={image} alt="" />

        <div className={style.TextAndPrices}>
          <ul className={style.Text}>
            <h1>{title}</h1>
            <p>{description}</p>
          </ul>

          <div className={style.Prices}>
            <p className={style.Price}>
              ${Math.ceil(price - price * (discount / 100))}
              {discount === 0 ? null : (
                <s className={style.strikedPrice}>${price}</s>
              )}
            </p>
          </div>
          <button
            className={isAdded === false ? style.CartBtn : style.CartBtn2}
            onClick={AddHandler}
          >
            {isAdded === false ? (
              <span className={style.IconContainer}>Pedir</span>
            ) : (
              <span className={style.IconContainer}>
                <svg
                  viewBox="0 0 448 512"
                  width="15"
                  height="15"
                  fill="rgb(0,0,0)"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
