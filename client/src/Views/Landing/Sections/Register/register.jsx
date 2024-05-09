import { useState } from "react";
import style from "./register.module.css";
import { useNavigate } from "react-router-dom";

const RegisterSection = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  return (
    <div className={style.container}>
      <div className={style.cards}>
        <div className={style.registerContainer}>
          <img
            src="https://i.ibb.co/yqYhbh3/Sign-up-cuate.png"
            alt="jnxv.png"
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
              onClick={() => navigate("/register")}
            >
              Crea tu cuenta
            </button>
          </div>
        </div>

        <div className={style.registerContainer}>
          <img
            src="https://i.ibb.co/tDCtDBJ/Pasta-amico.png"
            alt="jnxv.png"
            className={`${style.img} ${style.secondImg}`}
          />
          <p className={style.headTitle}>
            Encuentra tu plato ideal y deja que cada bocado se convierta en
            <br />
            <b>un momento de placer.</b>
          </p>
        </div>

        <div className={style.registerContainer}>
          <img
            src="https://i.ibb.co/48B8F7d/Customer-Survey-cuate.png"
            alt="jnxv.png"
            className={style.img}
          />
          <p className={style.headTitle}>
            El servicio fue de tu agrado?
            <br />
            <b>Queremos saberlo!</b>
          </p>
          <div className={style.buttonsContainer}>
            <button
              className={style.button}
              onClick={() => navigate("/register")}
            >
              Comparte tu opinión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
