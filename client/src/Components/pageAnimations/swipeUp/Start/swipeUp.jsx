import { useEffect } from "react";
import style from "./swipeUp.module.css";
import { motion } from "framer-motion";

const SwipeTopMiddle = () => {
  return (
    <motion.div
      className={style.swipeUp}
      initial={{ y: "100dvh" }}
      animate={{ y: "0dvh" }}
      exit={{ y: 0 }}
      transition={{ duration: 0.5 }}
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

export default SwipeTopMiddle;
