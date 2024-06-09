import { useEffect } from "react";
import SwipeMiddleTop from "../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import style from "./Reviews.module.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../Redux/actions";
const Reviews = () => {
  const dispatch = useDispatch();
  const usersWithReviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  useEffect(() => {}, [usersWithReviews]);

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
  return (
    <div className={style.Component}>
      <SwipeMiddleTop />
      {usersWithReviews.length !== 0 && (
        <header className={style.bigCard}>
          <div className={style.cardsContainer}>
            {usersWithReviews.map(({ name, lastname, image, reviews }) =>
              reviews.map((user) => (
                <div className={style.cardContainer} key={user.id}>
                  <div className={style.cardContent}>
                    <header className={style.cardHeader}>
                      <div className={style.userPhotoContainer}>
                        <picture>
                          <img
                            src={image}
                            alt="userPhoto"
                            className={style.userPhoto}
                          />
                        </picture>
                      </div>
                      <div className={style.userData}>
                        <div className={style.userName}>
                          <p className={style.usernameText}>
                            {name} {lastname}{" "}
                          </p>
                        </div>
                        <div className={style.starsContainer}>
                          <div className={style.stars}>
                            {generateStars(user.stars)}
                          </div>
                        </div>
                      </div>
                    </header>
                    <footer className={style.cardReviewContainer}>
                      <div className={style.cardReviewText}>
                        <p className={style.reviewText}>
                          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                          {user.text}
                        </p>
                      </div>
                    </footer>
                  </div>
                </div>
              ))
            )}
          </div>
        </header>
      )}
    </div>
  );
};

export default Reviews;

{
  /* <motion.div
className={style.swipeDown}
// initial={{ y: 0 }}
// animate={{ y: 1000 }}
exit={{ y: 0 }}
transition={{ duration: 1, delay: 1.5, type: "spring" }}
>
<div className={style.imgContainer}>
  <img
    src="https://i.ibb.co/MZ43nkm/review-message-5670890-4724167.webp"
    alt="logo-bold-2"
    className={style.img}
  />
</div>
</motion.div> */
}
