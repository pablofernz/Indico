import { useEffect } from "react";
import style from "./swipeDown.module.css";
import { motion } from "framer-motion";

const SwipeMiddleBottom = () => {
  return (
    <motion.div
      className={style.swipeDown}
      initial={{ y: 0 }}
      animate={{ y: 1000 }}
      exit={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className={style.imgContainer}>
        <img
          src="https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1718654737/Logo-light_v11oio.webp"
          alt="logo-bold-2"
          className={style.img}
        />
      </div>
    </motion.div>
  );
};

export default SwipeMiddleBottom;
