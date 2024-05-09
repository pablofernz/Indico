import { useEffect } from "react";
import style from "./swipeDown.module.css";
import { motion } from "framer-motion";

const SwipeMiddleTop = () => {
  return (
    <motion.div
      className={style.swipeDown}
      initial={{ y: 0 }}
      animate={{ y: -1000 }}
      exit={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, }}
    >
      {/* <motion.div
        className={style.imgContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://i.ibb.co/1TZQrh7/Logo-light.png"
          alt="logo-bold-2"
          className={style.img}
        />
      </motion.div> */}
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

export default SwipeMiddleTop;
