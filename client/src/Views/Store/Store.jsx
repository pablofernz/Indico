import { useEffect, useState } from "react";
import Menu from "./Menu/Menu";
import NavSide from "./Navegation/NavSide";
import style from "./Store.module.css";
import { useDispatch } from "react-redux";
import { getMenu } from "../../Redux/actions";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SwipeMiddleTop from "../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import SwipeBottomMiddle from "../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import VerifyToken from "../../Verifications/Token/verifyToken";

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [isExit, setExit] = useState(false);
  return (
    <div className={style.background}>
      <VerifyToken />
      <SwipeMiddleTop />
      {isExit == true && <SwipeBottomMiddle />}
      <AnimatePresence>
        {reviewsOpen == true && (
          <motion.div
            className={style.reviewOpenModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {reviewsOpen == true && (
          <motion.div
            className={style.reviewOpenModal2}
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            exit={{ y: 1000 }}
            transition={{ duration: 0.5 }}
          >
            <div className={style.reviewContainer}>
              <div className={style.reviewModalContent}>
                <div className={style.imgReviewContainer}>
                  <img
                    className={style.imgReview}
                    src="https://i.ibb.co/rkSgpJT/Conversation-pana.png"
                    alt="Conversation-pana"
                  />
                </div>
                <div className={style.reviewTextContainer}>
                  <p className={style.reviewText}>
                    ¿Quieres saber lo que opinan los demás sobre nosotros?
                    Tambien puedes dejarnos tu opinión.
                  </p>
                </div>
                <motion.div
                  className={style.reviewButtonContainer}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className={style.reviewButton}
                    onClick={() => {
                      setExit(true);
                      setTimeout(() => {
                        navigate("/reviews");
                      }, 500);
                    }}
                  >
                    Claro!
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        onClick={() => {
          setReviewsOpen(!reviewsOpen);
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className={style.reviewModalButtonContainer}
      >
        <div className={style.reviewButtonBack} />
        <button className={style.reviewButtonModal}>
          {reviewsOpen == false ? (
            <img
              className={style.img2}
              src="https://i.ibb.co/9v9fDz5/Sin-t-tulo-1.png"
              alt="reviewIcon"
            />
          ) : (
            <svg
              style={{
                scale: "0.75",
              }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm6 12H8.414l2.293 2.293a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L8.414 11H18a1 1 0 0 1 0 2Z"
                fill="#74dba0"
                width="20px"
                height="20px"
              ></path>
            </svg>
          )}
        </button>
      </motion.div>

      <div>
        <NavSide />
        <Menu />
      </div>
    </div>
  );
};

export default Store;
