import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useScroll, motion, useTransform } from "framer-motion";
import style from "./register.module.css";

const RegisterSection = () => {
  const navigate = useNavigate();
  const [isExit, setExit] = useState(false);

  const containerRef = useRef(null);

  const firstDivRef = useRef(null);
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: firstDivRef,
    offset: ["start end", "center start"],
  });
  const translateY1 = useTransform(
    scrollYProgress1,
    [0, 0.1],
    [1000, 0]
  );

  const secondDivRef = useRef(null);
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: secondDivRef,
    offset: ["start end", "center start"],
  });
  const translateY2 = useTransform(
    scrollYProgress2,
    [0, 0.2],
    [1000, 0,]
  );

  const thirdDivRef = useRef(null);
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: thirdDivRef,
    offset: ["start end", "center start"],
  });
  const translateY3 = useTransform(
    scrollYProgress3,
    [0, 0.3],
    [1000, 0]
  );

  return (
    <div className={style.bigContainer} ref={containerRef}>
      <div className={style.container}>
        <motion.div className={style.cards}>
          {!Cookies.get("session_token") ? (
            <motion.div
              className={style.registerContainer}
              ref={firstDivRef}
              style={{ translateY: translateY1 }}
            >
              <img
                loading="lazy"
                src="https://i.ibb.co/yqYhbh3/Sign-up-cuate.png"
                alt="Sign-up"
                className={style.img}
              />
              <p className={style.headTitle}>
                ¿Amante de la buena comida?
                <br />
                <b>Regístrate y únete a la experiencia.</b>
              </p>
              <div className={style.buttonsContainer}>
                <button
                  className={`${style.button} ${style.firstbutton}`}
                  onClick={() => {
                    setExit(true);
                    setTimeout(() => {
                      navigate("/register");
                    }, 500);
                  }}
                >
                  Crea tu cuenta
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={style.registerContainer}
              ref={firstDivRef}
              style={{ translateY: translateY1 }}
            >
              <img
                loading="lazy"
                src="https://i.ibb.co/yqYhbh3/Sign-up-cuate.png"
                alt="Sign-up"
                className={style.img}
              />
              <p className={style.headTitle}>
                Ya creaste la cuenta
                <br />
                <b>¿Qué esperas?</b>
              </p>
              <div className={style.buttonsContainer}>
                <button
                  className={`${style.button} ${style.firstbutton}`}
                  onClick={() => {
                    setExit(true);
                    setTimeout(() => {
                      navigate("/store");
                    }, 0);
                  }}
                >
                  Ir a la Tienda
                </button>
              </div>
            </motion.div>
          )}
          <motion.div
            className={style.registerContainer}
            ref={secondDivRef}
            style={{ translateY: translateY2 }}
          >
            <img
              loading="lazy"
              src="https://i.ibb.co/tDCtDBJ/Pasta-amico.png"
              alt="Pasta"
              className={`${style.img} ${style.secondImg}`}
            />
            <p className={style.headTitle}>
              Encuentra tu plato ideal y deja que cada bocado se convierta en
              <br />
              <b>un momento de placer.</b>
            </p>
          </motion.div>
          <motion.div
            className={style.registerContainer}
            ref={thirdDivRef}
            style={{ translateY: translateY3 }}
          >
            <img
              loading="lazy"
              src="https://i.ibb.co/48B8F7d/Customer-Survey-cuate.png"
              alt="Customer Survey"
              className={style.img}
            />
            <p className={style.headTitle}>
              ¿El servicio fue de tu agrado?
              <br />
              <b>¡Queremos saberlo!</b>
            </p>
            <div className={style.buttonsContainer}>
              <button
                className={style.button}
                onClick={() => {
                  setExit(true);
                  setTimeout(() => {
                    navigate("/reviews");
                  }, 500);
                }}
              >
                Comparte tu opinión
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterSection;
