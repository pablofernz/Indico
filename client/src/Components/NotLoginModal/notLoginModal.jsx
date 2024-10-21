import style from "./notLoginModal.module.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
const NotLoginModal = ({ setNotLoginModalOpen }) => {
//   useEffect(() => {
//     // Bloquear el scroll cuando el componente se monta
//     document.body.style.overflow = "hidden";

//     // Limpiar el efecto (restaurar scroll) cuando el componente se desmonte
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setNotLoginModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={style.background}
    >
      <div className={style.card}>xdd</div>
    </motion.div>,
    document.getElementById("modal")
  );
};

export default NotLoginModal;
