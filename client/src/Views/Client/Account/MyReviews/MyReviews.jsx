import style from "./MyReviews.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import IconLoader from "../../../../Components/iconLoader/iconLoader";
import SwipeBottomMiddle from "../../../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import { useNavigate } from "react-router-dom";
import useViewportWidth from "../../../../Hooks/useViewportWidth";
import Cookies from "js-cookie";

const ReviewCard = ({
  clientID,
  image,
  date,
  text,
  stars,
  id,
  getMyReviews,
}) => {
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
  const ref = useRef(null);
  const viewportWidth = useViewportWidth();

  const [deleteCheck, setDeleteCheck] = useState(false);
  const [olderHeight, setOlderHeight] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteReviewHandler = async () => {
    if (deleteCheck === false) {
      setOlderHeight(ref.current.getBoundingClientRect().height);
      setDeleteCheck(true);
    } else {
      setIsDeleting(true);
      try {
        await axios.delete(
          `https://indico-backend.up.railway.app/client/${clientID}/review/delete/${id}`
        );
        getMyReviews();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div ref={ref} className={style.reviewCard}>
      <AnimatePresence mode="popLayout">
        {deleteCheck === false ? (
          <motion.div
            key="reviewCard"
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
            }}
            className={style.reviewCardAux}
          >
            <header>
              <div className={style.starsContainer}>
                {viewportWidth > 600 ? (
                  <>
                    <div className={style.fakeStars}>{generateStars(5)}</div>
                    <div
                      className={style.stars}
                      style={{
                        color:
                          stars >= 4
                            ? "rgb(130, 220, 147)"
                            : stars === 3
                            ? "rgb(220, 164, 59)"
                            : "rgb(171, 13, 13)",
                      }}
                    >
                      {generateStars(stars)}
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        color:
                          stars >= 4
                            ? "rgb(130, 220, 147)"
                            : stars === 3
                            ? "rgb(220, 164, 59)"
                            : "rgb(171, 13, 13)",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      {stars}
                    </p>
                    <div
                      className={style.star}
                      style={{
                        color:
                          stars >= 4
                            ? "rgb(130, 220, 147)"
                            : stars === 3
                            ? "rgb(220, 164, 59)"
                            : "rgb(171, 13, 13)",
                      }}
                    >
                      {generateStars(1)}
                    </div>
                  </>
                )}
              </div>
              <picture className={style.imageContainer}>
                <img src={image} alt="" />
              </picture>
              <p className={style.date}>{date}</p>
            </header>
            <div className={style.dataContainer}>
              <p>{text}</p>
            </div>
            <footer>
              <button
                className={style.deleteReviewButton}
                onClick={deleteReviewHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="deleteCheckCard"
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
            }}
            style={{ height: olderHeight }}
            className={style.deleteCheckContainer}
          >
            <AnimatePresence mode="popLayout">
              {isDeleting === false ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={style.deleteCheckContainerAux}
                >
                  <div className={style.iconContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      height="50"
                      width="50"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <p>
                    Deseas borrar esta reseña? <br />{" "}
                    <label>Ya no podrás recuperarla</label>
                  </p>
                  <button
                    className={style.deleteButton}
                    onClick={deleteReviewHandler}
                  >
                    Si, borrar
                  </button>
                </motion.div>
              ) : (
                <IconLoader color="rgb(42,42,42)" scale="1.5" />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();
  const [isExit, setExit] = useState(false);
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  const [reviewsData, setReviewsData] = useState([]);
  const getMyReviews = async () => {
    try {
      const response = await axios.get(
        `https://indico-backend.up.railway.app/client/${userData.id}/reviews`
      );
      setReviewsData(response.data);
    } catch (error) {
      setReviewsData(null);
    }
  };

  useEffect(() => {
    Cookies.get("session_token") ? getMyReviews() : navigate("/login");
  }, []);

  // useEffect(() => {
  //   console.log(reviewsData[0]);
  // }, [reviewsData]);

  return (
    <div className={style.accountComponent}>
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

          <button
            type="button"
            className={style.reload}
            onClick={() => {
              getMyReviews();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="30"
              height="30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>

          <header>
            <p>Mis reseñas</p>
          </header>

          <main>
            <div className={style.upperShadow}></div>
            <div className={style.upperShadow}></div>
            <AnimatePresence mode="popLayout">
              {reviewsData?.length &&
                reviewsData.map((review) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={review._id}
                    layout
                    className={style.cardContainerAux}
                  >
                    <ReviewCard
                      image={userData.image}
                      date={review.date.split(" ")[0]}
                      text={review.text}
                      stars={review.stars}
                      id={review._id}
                      clientID={userData.id}
                      getMyReviews={getMyReviews}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {reviewsData == null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={style.errorComponent}
                >
                  <picture className={style.gifContainer}>
                    <img
                      src="https://res.cloudinary.com/dnrprmypf/image/upload/q_12/v1728913949/Projects%20Images/Indico/Store%20image%20backgrounds_utils/Missing%20reviews%20gif.webp"
                      alt="heart broke"
                    />
                  </picture>
                  <p className={style.errorText}>
                    Aún no escribiste ninguna reseña
                    <br />
                    <label>Ve a dejar una!</label>
                  </p>

                  <button
                    // onClick={() => {
                    //   setToStore(true);
                    //   window.sessionStorage.removeItem("cartItems");

                    //   setTimeout(() => {
                    //     window.location.href = "/store";
                    //   }, 500);
                    // }}
                    className={style.errorButton}
                  >
                    Dar una reseña
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {reviewsData !== null && !reviewsData?.length >= 1 && (
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
export default MyReviews;
