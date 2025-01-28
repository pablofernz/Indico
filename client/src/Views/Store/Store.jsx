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
import NotLoginModal from "../../Components/NotLoginModal/notLoginModal";

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  useEffect(() => {
    window.sessionStorage.setItem("page_aux", "/store");
  }, []);

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

      <div>
        <NavSide />
        <Menu setExit={setExit} />
      </div>
    </div>
  );
};

export default Store;
