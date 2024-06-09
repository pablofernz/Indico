import style from "./verifyToken.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SwipeBottomMiddle from "../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import Cookies from "js-cookie";
import { validateToken } from "../../Redux/actions";

const VerifyToken = () => {
  const navigate = useNavigate();
  const [isExit, setExit] = useState(false);
  const [isTokenValid, setTokenValid] = useState(true);
  const tokenValidation = async () => {
    const token = Cookies.get("session_token");
    try {
      if (token) {
        const response = await validateToken(token);
        if (response.status !== 200) {
          setTokenValid(false);
        }
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
  useEffect(() => {
    tokenValidation();
  });

  return (
    <div>
      {isExit === true && <SwipeBottomMiddle />}
      {isTokenValid === false && (
        <div>
          <div
            className={style.OpenModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          ></div>

          <div
            className={style.OpenModal2}
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            exit={{ y: 1000 }}
            transition={{ duration: 0.5 }}
          >
            <div className={style.Container}>
              <div className={style.ModalContent}>
                <div className={style.TextContainer}>
                  <p className={style.Text}>Inicia sesión nuevamente</p>
                </div>
                <div className={style.ButtonContainer}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={style.Button}
                    onClick={() => {
                      setExit(true);
                      setTimeout(() => {
                        navigate("/login");
                      }, 500);
                    }}
                  >
                    Claro!
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyToken;
