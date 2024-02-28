import { useNavigate } from "react-router-dom";
import style from "./404.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.page}>
        <p className={style.text}>
          No encontramos esta página...
          <br />
          <b>¿Alguien sabe el camino de regreso?</b>
        </p>
        <img
          src="https://i.ibb.co/wd05Qxc/Lost-amico.png"
          alt=""
          className={style.img}
        />
        <button className={style.button2} onClick={() => navigate("/landing")}>
          <div className={style.Btn}>
            <svg height="1em" className={style.arrow} viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
            </svg>
          </div>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;