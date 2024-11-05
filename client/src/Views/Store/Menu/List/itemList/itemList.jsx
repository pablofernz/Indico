// Este componente debe renderizar la informacion de cada comida del menú
import { useEffect, useState } from "react";
import style from "./itemList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  addToCart,
  cartStatus,
  deleteToCart,
} from "../../../../../Redux/actions";
import NotLoginModal from "../../../../../Components/NotLoginModal/notLoginModal";

export default function ItemList({
  id,
  title,
  image,
  description,
  price,
  discount,
  className,
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

  const [isLiked, setIsLiked] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const likesHandler = async () => {
    setIsLiked(!isLiked);
    if (userData) {
      try {
        const favoriteFood = { _id: id, title };
        const response = await axios.patch(
          `https://indico-backend.onrender.com/client/${userData.id}/favoritefoods`,
          favoriteFood
        );

        userData.favoriteFoods = response.data;

        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      setNotLoginModalOpen(true);
    }
  };

  useEffect(() => {
    if (userData?.favoriteFoods) {
      const existingLiked = userData.favoriteFoods.filter(
        (dish) => dish._id === id
      );
      setIsLiked(!!existingLiked.length);
    }
  }, []);

  const [notLoginModalOpen, setNotLoginModalOpen] = useState(false);

  return (
    <div className={className}>
      <div className={style.Content}>
        <AnimatePresence>
          {notLoginModalOpen && (
            <NotLoginModal setNotLoginModalOpen={setNotLoginModalOpen} />
          )}
        </AnimatePresence>
        {discount ? (
          <div className={style.Discount}>{`-${discount}%`} OFF</div>
        ) : null}

        <img className={style.Img} src={image} alt="" />

        <div className={style.TextAndPrices}>
          <ul className={style.Text}>
            <h1 title={title}>{title}</h1>
            <p title={description}>{description}</p>
          </ul>

          <div className={style.Prices}>
            <p className={style.Price}>
              ${Math.ceil(price - price * (discount / 100))}
              {discount === 0 ? null : (
                <s className={style.strikedPrice}>${price}</s>
              )}
            </p>
          </div>
        </div>
        <div className={style.buttonContainer}>
          <div className={style.buttonSeparator}></div>
          <motion.button className={style.Like} onClick={likesHandler}>
            <AnimatePresence mode="wait">
              {isLiked === true ? (
                <motion.svg
                  key="liked"
                  initial={{ scale: 0 }}
                  exit={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="rgb(190,0,0)"
                  width="25"
                  height="25"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="notLiked"
                  initial={{ scale: 0 }}
                  exit={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="25"
                  height="25"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
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
