import { useEffect, useState } from "react";
import SwipeMiddleTop from "../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import style from "./Reviews.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useViewportWidth from "../../Hooks/useViewportWidth";
import { getReviews } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import SwipeBottomMiddle from "../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import CreateReviewForm from "./reviewForm/reviewForm";
import Cookies from "js-cookie";
import NotLoginModal from "../../Components/NotLoginModal/notLoginModal";

const Reviews = () => {
  const viewportWidth = useViewportWidth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersWithReviews = useSelector((state) => state.reviews);

  const [users, setUsers] = useState([]);
  const [exit, setExit] = useState(false);
  const [toStore, setToStore] = useState(false);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [optionsDropdownOpen, setOptionsDropdownOpen] = useState(false);
  const [filterByStars, setFilterByStars] = useState(0);
  const [updateSignal, setUpdateSignal] = useState(false);

  const userData = JSON.parse(window.localStorage.getItem("userData"));

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch, updateSignal]);
  const reviews = useSelector((state) => state.reviews);

  const ratingPoints = () => {
    let totalStars = 0;
    let numberOfReviews = 0;

    reviews.forEach((user) => {
      user.reviews.forEach((item) => {
        totalStars += item.stars;
        numberOfReviews++;
      });
    });

    return Number((((totalStars / numberOfReviews) * 10) / 10).toFixed(1));
  };

  const reviewsAmount = () => {
    let numberOfReviews = 0;

    reviews.forEach((user) => {
      user.reviews.forEach((item) => {
        numberOfReviews++;
      });
    });

    return numberOfReviews;
  };

  const storeData = {
    reviewsAmount: reviewsAmount(),
    averageScore: ratingPoints(),
  };

  const test = () => {
    let totalReviews = [];

    usersWithReviews.forEach((user) => {
      user.reviews.forEach((item) => {
        totalReviews.push(item);
      });
    });

    return totalReviews;
  };

  useEffect(() => {
    if (usersWithReviews) {
      const singleReviewsArray = [];

      usersWithReviews.forEach((data) => {
        data.reviews.forEach((review) => {
          const singleReviewData = {
            ...data,
            reviews: [review],
          };
          singleReviewsArray.push(singleReviewData);
        });
      });

      setUsers(
        filterByStars === 0
          ? singleReviewsArray
          : singleReviewsArray.filter(
              (users) => users.reviews[0].stars === filterByStars
            )
      );
    }
  }, [usersWithReviews, filterByStars]);

  const generateStars = (stars) => {
    const starIcons = [];
    for (let i = 0; i < stars; i++) {
      starIcons.push(
        <svg
          key={i}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    return starIcons;
  };

  const averageScoreAux = [
    {
      stars: 5,
      color: "rgb(91, 216, 100)",
      width:
        test().filter((review) => review.stars === 5).length * 10 < 65
          ? `${test().filter((review) => review.stars === 5).length * 10}%`
          : "65%",
      amount: test().filter((review) => review.stars === 5).length,
    },
    {
      stars: 4,
      color: "rgb(191, 216, 91)",
      width:
        test().filter((review) => review.stars === 4).length * 10 < 65
          ? `${test().filter((review) => review.stars === 4).length * 10}%`
          : "65%",
      amount: test().filter((review) => review.stars === 4).length,
    },
    {
      stars: 3,
      color: "rgb(230, 231, 91)",
      width:
        test().filter((review) => review.stars === 3).length * 10 < 65
          ? `${test().filter((review) => review.stars === 3).length * 10}%`
          : "65%",
      amount: test().filter((review) => review.stars === 3).length,
    },
    {
      stars: 2,
      color: "rgb(216, 151, 91)",
      width:
        test().filter((review) => review.stars === 2).length * 10 < 65
          ? `${test().filter((review) => review.stars === 2).length * 10}%`
          : "65%",
      amount: test().filter((review) => review.stars === 2).length,
    },
    {
      stars: 1,
      color: "rgb(216, 91, 91)",
      width:
        test().filter((review) => review.stars === 1).length * 10 < 65
          ? `${test().filter((review) => review.stars === 1).length * 10}%`
          : "65%",
      amount: test().filter((review) => review.stars === 1).length,
    },
  ];

  const openFormHandler = () => {
    if (!Cookies.get("session_token") && !userData) {
      setLogin(true);
    } else {
      setReviewFormOpen(true);
    }
  };
  return (
    <div className={style.Component}>
      <SwipeMiddleTop />
      {exit && <SwipeBottomMiddle />}
      {toStore == true && <SwipeBottomMiddle />}
      <AnimatePresence>
        {login == true && (
          <NotLoginModal
            text="Debes estar logueado para poder escribir una reseña"
            setNotLoginModalOpen={setLogin}
            exit={setExit}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {reviewFormOpen && (
          <CreateReviewForm
            setReviewFormOpen={setReviewFormOpen}
            setUpdateSignal={setUpdateSignal}
          />
        )}
      </AnimatePresence>

      {viewportWidth > 800 && (
        <aside className={style.leftSide}>
          <header>
            <div className={style.logoAndName}>
              <button
                className={style.back}
                onClick={() => {
                  setExit(true);
                  setTimeout(() => {
                    navigate("/home");
                  }, 500);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
            </div>

            <div className={style.leftSideText}>
              <p className={style.primaryText}>
                Lee lo que dicen nuestros clientes de nosotros.
              </p>
              <p className={style.secondaryText}>
                ¿Tienes algo que contar? ¡Suelta tu experiencia y compártela con
                nosotros y con todo el mundo!
              </p>
            </div>
          </header>
          <footer>
            <button onClick={openFormHandler}>Dejar una reseña</button>
          </footer>
        </aside>
      )}
      <div className={style.rightSide}>
        <header>
          <h1>Reseñas</h1>
          <div className={style.buttonsContainer}>
            <div className={style.optionsAndDropdown}>
              <button
                className={style.options}
                onClick={() => {
                  setOptionsDropdownOpen(!optionsDropdownOpen);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  height="25"
                  width="25"
                >
                  <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                </svg>
              </button>
              <AnimatePresence mode="popLayout">
                {optionsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    exit={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={style.dropdown}
                  >
                    <header>Ver reseñas con</header>
                    <footer>
                      {averageScoreAux.map((stars, index) => (
                        <button
                          className={style.setStarsButton}
                          onClick={() => {
                            setFilterByStars(
                              filterByStars === stars.stars ? 0 : stars.stars
                            );
                          }}
                          key={index}
                        >
                          <svg
                            fill={
                              filterByStars >= stars.stars
                                ? "rgb(141, 214, 146)"
                                : "rgb(219, 219, 219)"
                            }
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                      ))}
                    </footer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className={style.toStore}
              onClick={() => {
                setToStore(true);
                setTimeout(() => {
                  navigate("/store");
                }, 500);
              }}
            >
              {viewportWidth > 400 ? " Ir a la Tienda" : "Tienda"}
            </button>
          </div>
        </header>
        <div className={style.metricsContainer}>
          {viewportWidth > 800 && (
            <>
              {" "}
              <div className={style.totalReviews}>
                <p>Reseñas totales</p>
                <p>
                  {storeData.reviewsAmount}
                  <label>
                    +31%
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      height="18"
                      width="18"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                      />
                    </svg>
                  </label>
                </p>
                <p></p>
              </div>
              <div className={style.averageReviewsScore}>
                <p>Puntuación promedio</p>
                <p>
                  {storeData.averageScore}
                  <label className={style.fakeStars}>
                    {generateStars(5)}
                    <label className={style.stars}>
                      {generateStars(Math.floor(storeData.averageScore))}
                    </label>
                  </label>
                </p>
              </div>
              <div className={style.reviewsScoreGraphic}>
                {averageScoreAux.map((score, index) => (
                  <div key={index} className={style.test}>
                    <div className={style.starsSide}>
                      <label className={style.starGraphic}>
                        {generateStars(1)}
                      </label>
                      <p>{score.stars}</p>
                    </div>
                    <div
                      className={style.barContainer}
                      style={{
                        width: score.width,
                        backgroundColor: score.color,
                      }}
                    >
                      <div className={style.bar}></div>
                    </div>
                    <p className={style.number}>
                      {score.amount > 0 ? score.amount : null}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {viewportWidth < 800 && (
            <>
              <div className={style.card2Right}>
                <div className={style.iconStatsContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="rgb(178, 255, 187)"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={style.statsTextContainer}>
                  <header className={style.primaryTextMetricsCard}>
                    {storeData.reviewsAmount}
                  </header>
                  <footer className={style.secondText}>Reseñas</footer>
                </div>
              </div>

              <div
                initial={{ scale: 0.01 }}
                animate={{ scale: 0.9 }}
                transition={{ duration: 1, delay: 2, type: "spring" }}
                className={style.card2Right}
              >
                <div className={style.iconStatsContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(178, 255, 187)"
                    width="30"
                    height="30"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={style.statsTextContainer}>
                  <header className={style.primaryTextMetricsCard}>
                    {storeData.averageScore}
                  </header>
                  <footer className={style.secondText}>
                    {viewportWidth < 500 ? "De media" : "Puntuación media"}
                  </footer>
                </div>
              </div>
            </>
          )}
        </div>
        <main>
          <div className={style.cardsContainer}>
            <div className={style.upperShadow}></div>
            <AnimatePresence mode="popLayout">
              {users.map((user, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={index}
                  className={style.reviewCard}
                  layout
                >
                  <div className={style.userDataSide}>
                    <picture>
                      <img src={user.image} alt="userImage" />
                      {userData?.id === user.id && (
                        <p className={style.userIndicator}>Yo</p>
                      )}
                    </picture>
                    <div>
                      <p className={style.name}>
                        {user.name} {user.lastname}
                      </p>
                      {viewportWidth > 800 && (
                        <>
                          <p className={style.totalPurchases}>
                            {user.purchases.length}{" "}
                            {user.purchases.length > 1
                              ? "compras realizadas"
                              : "compra realizada"}
                          </p>
                          <p className={style.userTotalReviews}>
                            Escribió{" "}
                            {
                              usersWithReviews.filter(
                                (test) => test.id == user.id
                              )[0].reviews.length
                            }{" "}
                            {usersWithReviews.filter(
                              (test) => test.id == user.id
                            )[0].reviews.length > 1
                              ? "reseñas"
                              : "reseña"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={style.userReviewSide}>
                    <header>
                      <label className={style.fakeStarsReviews}>
                        {generateStars(5)}
                        <label className={style.starsReviews}>
                          {generateStars(user.reviews[0].stars)}
                        </label>
                      </label>
                      <p className={style.reviewDate}>
                        {user.reviews[0].date?.split(" ")[0]}
                      </p>
                    </header>
                    <footer>
                      <p className={style.reviewText}>{user.reviews[0].text}</p>
                    </footer>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className={style.lowerShadow}></div>
          </div>
        </main>

        {viewportWidth < 800 && (
          <div className={style.createButtonContainer}>
            <button onClick={openFormHandler}>Dejar una reseña</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
