import { useEffect, useState } from "react";
import style from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartStatus, deleteToCart } from "../../../Redux/actions";

export default function Card({
  id,
  title,
  image,
  description,
  price,
  discount,
}) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const cartState = useSelector((state) => state.cart);
  const { foodInCart } = cartState;

  const foodPurchased = {
    id,
    title,
    image,
    description,
    price,
    discount,
    quantity: 1,
    get total() {
      return this.price - this.price * (this.discount / 100) * this.quantity;
    },
  };

  const AddHandler = () => {
    dispatch(cartStatus(false));
    if (isAdded === false) {
      setIsAdded(true);
      dispatch(addToCart(foodPurchased));
    } else {
      setIsAdded(false);
      dispatch(deleteToCart(foodPurchased));
    }
  };

  const checkIfAlreadyAdded = () => {
    const isAlreadyAdded = foodInCart.some((item) => item.id === id);
    if (isAlreadyAdded) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  };
  useEffect(() => {
    checkIfAlreadyAdded();
  });

  return (
    <div className={style.Content}>
      {discount ? (
        <div className={style.Discount}>{`${discount}%`} OFF</div>
      ) : null}

      <img className={style.Img} src={image} alt="" />
      <div>
        <ul className={style.Text}>
          <h1>{title}</h1>
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
  );
}
