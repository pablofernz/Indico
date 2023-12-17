import style from "./startSection.module.css";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./Card 4/reviewCard";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import MenuCard from "./Card 2/menuCard";

const StartSection = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const dishes = useSelector((state) => state.menu);

  const notificationHandleClick = () => {
    setNotification(!notification);
  };

  useEffect(() => {
    if (notification === true) {
      toast.success("Claro! Te avisaremos cuando se desocupen mesas.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "rgb(23,23,23)",
          color: "#fff",
          fontSize: 15,
        },
      });
    }
  });

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const actualDate = new Date();
    const hours = actualDate.getHours();

    if (hours < 7 || hours > 23) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);
  return (
    <div className={style.background}>
      <Toaster />
      {/* <div className={style.container2}>
        <div className={style.glass} />
        <h1 className={style.title}>Bienvenido a Indico</h1>
        <p className={style.subtitle}>
          Creamos una experiencia culinaria única donde la frescura de la
          naturaleza se fusiona con la excelencia de la alta cocina.
          <br />
          <b>Descubre su equilibrio perfecto.</b>
        </p>
        <button className={style.button} onClick={() => navigate("/store")}>
          Ver el menú
        </button>
      </div>
      <div className={style.mouse}></div> */}

      <div className={style.textContainer}>
        <div className={style.container2}>
          <h1 className={style.title}>Bienvenido a Indico</h1>
          <p className={style.subtitle}>
            Una experiencia culinaria única donde la frescura de la naturaleza
            se fusiona con la excelencia de la alta cocina.
            <br />
            <b>Descubre su equilibrio perfecto.</b>
          </p>
          <button className={style.button} onClick={() => navigate("/store")}>
            Ver el menú
          </button>
        </div>
      </div>

      <div className={style.CardsContainer}>
        <div className={style.CardsGrid}>
          <div className={style.Card1}>
            <button
              className={style.notificationButton}
              onClick={notificationHandleClick}
            ></button>
            {notification === false ? (
              <svg
                className={style.notificationIcon}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"
                />
              </svg>
            ) : (
              <svg
                className={style.notificationIconActive}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"
                />
              </svg>
            )}

            <p className={style.reserveText1}>0</p>
            <p className={style.reserveText2}>mesas disponibles</p>
            <button className={style.button2}>
              Reservar
              <div className={style.Btn}>
                <svg
                  height="1.2em"
                  className={style.arrow}
                  viewBox="0 0 512 512"
                >
                  <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
                </svg>
              </div>
            </button>
          </div>

          <div className={style.Card2}>
            
          </div>

          {isOpen ? (
            <div className={style.Card3Open}>
              <p className={style.HoursText}>Lunes a Viernes</p>
              <p className={style.HoursTextOpen}>Abierto</p>
              <p className={style.HoursText}>7:00 - 23:00</p>
            </div>
          ) : (
            <div className={style.Card3Closed}>
              <p className={style.HoursText}>Lunes a Viernes</p>
              <p className={style.HoursTextClosed}>Cerrado</p>
              <p className={style.HoursText}>7:00 - 23:00</p>
            </div>
          )}

          <div className={style.Card4}>
            <ReviewCard />
          </div>
        </div>
      </div>
      <div className={style.mouse}></div>
    </div>
  );
};

export default StartSection;
