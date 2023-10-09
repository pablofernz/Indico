// Este componente debe renderizar la informacion de cada comida del menú
import { useState } from "react";
import style from "./Card.module.css";
// {
//     "_id": {
//       "$oid": "650c962234cece9c58f9bf43"
//     },
//     "title": "Ensalada César con pollo",
//     "description": "Ensalada con lechugas romanas, pechugas de pollo, huevo y queso parmesano,",
//     "price": 800,
//     "discount": 0,
//     "image": "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/06/Ensalada-cesar.jpg",
//     "type": "Ensalada"
//   }

export default function Card({
  id,
  title,
  image,
  description,
  price,
  discount,
}) {
  const [isAdded, setIsAdded] = useState(false);

  const AddHandler = () => {
    if (isAdded === false) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  };
  console.log(isAdded);
  return (
    <div className={style.Content}>
      {discount ? (
        <div className={style.Discount}>{`-${discount}%`}</div>
      ) : null}

      <img className={style.Img} src={image} alt="" />
      <div>
        <ul className={style.Text}>
          <h1>{`${title}.`}</h1>
          <p>{description}</p>
        </ul>
      </div>
      <div className={style.Prices}>
        <p className={style.Price}>
          ${Math.ceil(price - price * (discount / 100))}
          {discount === 0 ? null : (
            <s className={style.strikedPrice}>${price}</s>
          )}
        </p>

        <button className={style.CartBtn} onClick={AddHandler}>
          {isAdded === false ? (
            <span className={style.IconContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgb(235,235,235)"
                viewBox="0 0 16 16"
              >
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </span>
          ) : (
            <span className={style.IconContainer}>
              <svg
                viewBox="0 0 448 512"
                width="15"
                height="15"
                fill="rgb(235,235,235)"
                
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
