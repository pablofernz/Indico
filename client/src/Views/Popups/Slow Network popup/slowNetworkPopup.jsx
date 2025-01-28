import { motion } from "framer-motion";
import style from "./slowNetworkPopup.module.css";
import { useDispatch } from "react-redux";
import { setSlowNetworkPopup } from "../../../Redux/actions";

const SlowNetworkPopup = ({ close }) => {
  const dispatch = useDispatch();
  const closeHandler = () => {
    // window.sessionStorage.setItem("slowNetwork_popup_closed", true);
    dispatch(setSlowNetworkPopup(false));
  };
  return (
    <motion.div
      key="slowNetwork"
      initial={{ opacity: 0, x: 200 }}
      exit={{
        opacity: 0,
        x: 200,
        transition: { duration: 0.5 },
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 },
      }}
      className={style.card}
      layout
    >
      <div className={style.leftSide}>
        <h1>Conexión lenta 🐌 </h1>
        <p>
          Nuestros datos están alojados en un servicio gratuito en la nube, lo
          que puede afectar la velocidad de carga.
        </p>
        <button onClick={closeHandler}>No hay problema</button>
      </div>
    </motion.div>
  );
};

export default SlowNetworkPopup;
