import { useEffect } from "react";
import SwipeMiddleTop from "../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import style from "./Reviews.module.css";
import { motion } from "framer-motion";
const Reviews = () => {
  useEffect(() => {});

  return (
    <div className={style.Component}>
      <SwipeMiddleTop />
      <motion.div
        className={style.bigCardConteiner}
        // initial={{ y: 0 }}
        // animate={{ y: 1000 }}
        exit={{ y: 0 }}
        transition={{ duration: 1, delay: 1.5, type: "spring" }}
      ></motion.div>
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
