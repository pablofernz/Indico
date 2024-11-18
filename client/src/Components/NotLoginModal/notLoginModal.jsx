import style from "./notLoginModal.module.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NotLoginModal = ({ setNotLoginModalOpen, text, exit }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setNotLoginModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const navigate = useNavigate();
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={style.background}
    >
      <motion.div
        className={style.reviewOpenModal2}
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        exit={{ y: 1000 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className={style.reviewContainer}>
          <button
            onClick={() => {
              setNotLoginModalOpen(false);
            }}
            className={style.exitButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              height="25"
              width="25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className={style.reviewModalContent}>
            <div className={style.imgReviewContainer}>
              <img
                className={style.imgReview}
                src="https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1730380872/Projects%20Images/Indico/Store%20image%20backgrounds_utils/Sign_up-cuate_cbkk7v.webp"
                alt="LogoutImage"
              />
            </div>
            <div className={style.reviewTextContainer}>
              <p className={style.reviewText}>{text} </p>
            </div>
            <div className={style.reviewButtonContainer}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={style.secundaryButton}
                onClick={() => {
                  exit(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 500);
                }}
              >
                Iniciar sesión
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={style.primaryButton}
                onClick={() => {
                  exit(true);
                  setTimeout(() => {
                    navigate("/register");
                  }, 500);
                }}
              >
                Registrarse
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("modal")
  );
};

export default NotLoginModal;
