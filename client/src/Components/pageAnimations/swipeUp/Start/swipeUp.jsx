import { useEffect } from "react";
import style from "./swipeUp.module.css";
import { motion } from "framer-motion";

const SwipeTopMiddle = () => {
  return (
    <motion.div
      className={style.swipeUp}
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      exit={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.imgContainer}>
        <img
          src="https://i.ibb.co/1TZQrh7/Logo-light.png"
          alt="logo-bold-2"
          className={style.img}
        />
      </div>
    </motion.div>
  );
};

export default SwipeTopMiddle;
