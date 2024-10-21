import style from "./Favorites.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { likesHandlerFunction } from "../../../../Components/MenuCards/Card/Card";
import IconLoader from "../../../../Components/iconLoader/iconLoader";
import SwipeBottomMiddle from "../../../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import { addToCart } from "../../../../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const FavoriteFoodsCard = ({
  _id,
  title,
  image,
  price,
  discount,
  userData,
  description,
  setToStore,
  getFavoriteFoodsData,
}) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(true);

  const likeHandler = async (id, title) => {
    await likesHandlerFunction(setIsLiked, isLiked, userData, id, title);
    getFavoriteFoodsData();
  };

  const purchaseHandler = () => {
    setToStore(true);
    setTimeout(() => {
      window.location.href = "/store";
    }, 500);

    const foodPurchased = {
      _id,
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
    window.sessionStorage.setItem("cartItems", JSON.stringify([foodPurchased]));
  };
  return (
    <div className={style.foodCard} key={_id}>
      <motion.button
        className={style.Like}
        onClick={() => {
          likeHandler(_id, title);
        }}
      >
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

      {discount ? (
        <div className={style.Discount}>{`${discount}%`} OFF</div>
      ) : null}
      <picture className={style.imageContainer}>
        <img src={image} alt="foodImage" />
      </picture>
      <p className={style.foodTitle}>{title}</p>
      <footer className={style.priceAndButton}>
        <p className={style.Price}>
          ${Math.ceil(price - price * (discount / 100))}
        </p>
        <p style={{ opacity: 0.3 }}>|</p>
        <button className={style.button} onClick={purchaseHandler}>
          Pedir
        </button>
      </footer>
    </div>
  );
};

const Favorites = () => {
  const navigate = useNavigate();
  const [isExit, setExit] = useState(false);
  const [toStore, setToStore] = useState(false);
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  const [foodsData, setFoodsData] = useState([]);
  const getFavoriteFoodsData = async () => {
    try {
      const response = await axios.get(
        `https://indico-backend.up.railway.app/client/${userData.id}/favoritefoods`
        // `http://localhost:3001/client/favoritefoods/${userData.id}`
      );
      setFoodsData(response.data.length ? response.data : null);
    } catch (error) {
      console.log(error);
      setFoodsData(null);
    }
  };
  useEffect(() => {
    if (!Cookies.get("session_token")) {
      navigate("/login");
    } else {
      getFavoriteFoodsData();
    }
  }, []);

  return (
    <div className={style.accountComponent}>
      {toStore == true && <SwipeBottomMiddle />}

      <div className={style.background} />
      {/* - - - - - - - - - - - - - CARD - - - - - - - - - - - - - - - - - -  */}

      <div className={style.cardContainer}>
        <div className={style.Card}>
          <motion.div
            className={style.CardSlider}
            initial={{ x: 0 }}
            animate={{ x: 1000 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {/* - - - - - - - - - - - - - BUTTONS - - - - - - - - - - - - - - - - - -  */}

          {isExit === true && (
            <motion.div
              className={style.CardSlider}
              initial={{ x: 600 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

          <button
            type="button"
            className={style.back}
            onClick={() => {
              setExit(true);
              setTimeout(() => {
                navigate("/account");
              }, 500);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <header>
            <p>Platos favoritos</p>
          </header>

          <main>
            <div className={style.upperShadow}></div>
            <div className={style.upperShadow}></div>
            <AnimatePresence mode="popLayout">
              {foodsData?.length &&
                foodsData.map((food) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={food._id}
                    layout
                  >
                    <FavoriteFoodsCard
                      _id={food._id}
                      title={food.title}
                      image={food.image}
                      price={food.price}
                      description={food.description}
                      discount={food.discount}
                      userData={userData}
                      setToStore={setToStore}
                      getFavoriteFoodsData={getFavoriteFoodsData}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {foodsData == null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={style.errorComponent}
                >
                  <picture className={style.gifContainer}>
                    <img
                      src="https://res.cloudinary.com/dnrprmypf/image/upload/q_32/v1728879044/Projects%20Images/Indico/Store%20image%20backgrounds_utils/Favorite%20food%20missing.webp"
                      alt="heart broke"
                    />
                  </picture>
                  <p className={style.errorText}>
                    No tienes platos favoritos <br />
                    <label>Pásate por la tienda!</label>
                  </p>

                  <button
                    onClick={() => {
                      setToStore(true);
                      window.sessionStorage.removeItem("cartItems");

                      setTimeout(() => {
                        window.location.href = "/store";
                      }, 500);
                    }}
                    className={style.errorButton}
                  >
                    Ir a la Tienda
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {foodsData !== null && !foodsData?.length >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={style.errorComponent}
                >
                  <IconLoader color="rgb(42,42,42)" scale="1.5" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className={style.bottomShadow}></div>
            <div className={style.bottomShadow}></div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Favorites;
