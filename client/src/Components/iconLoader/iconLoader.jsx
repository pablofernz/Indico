import style from "./iconLoader.module.css";
import { motion } from "framer-motion";

const IconLoader = ({ color, scale }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className={style.dotWave} style={{ scale: scale || "1" }}>
        <div
          className={style.dotWaveDot}
          style={{ backgroundColor: color || " rgb(235,235,235)" }}
        />
        <div
          className={style.dotWaveDot}
          style={{ backgroundColor: color || " rgb(235,235,235)" }}
        />
        <div
          className={style.dotWaveDot}
          style={{ backgroundColor: color || " rgb(235,235,235)" }}
        />
        <div
          className={style.dotWaveDot}
          style={{ backgroundColor: color || " rgb(235,235,235)" }}
        />
      </div>
    </motion.div>
  );
};

export default IconLoader;
