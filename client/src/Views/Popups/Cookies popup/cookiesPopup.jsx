import { motion } from "framer-motion";
import style from "./cookiesPopup.module.css";
import { setCookiesPopup } from "../../../Redux/actions";

const CookiesPopup = ({ setCookiesPopup }) => {
  const closeHandler = () => {
    window.sessionStorage.setItem("cookie_popup_closed", true);
    setCookiesPopup(false);
  };

  return (
    <motion.div
      key="cookiesPopup"
      initial={{ opacity: 0, x: 200 }}
      exit={{
        opacity: 0,
        x: 200,
        transition: { duration: 0.5 },
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: 2 },
      }}
      className={style.card}
      layout
    >
      <div className={style.leftSide}>
        <h1>Cookies 🍪</h1>
        <p>
          Este sitio utiliza cookies para mejorar tu experiencia. Los datos son
          privados y no son compartidos con terceros.
        </p>
        <button onClick={closeHandler}>Entendido</button>
      </div>
    </motion.div>
  );
};

export default CookiesPopup;
