import style from "./startSection.module.css";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./Card 4/reviewCard";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import MenuCard from "./Card 2/menuCard";
import SwipeBottomMiddle from "../../../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import SwipeMiddleBottom from "../../../../Components/pageAnimations/swipeDown/Start/swipeDown";

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
  const [isExit, setExit] = useState(false);
  return (
    <div className={style.background}>
      {isExit == true && <SwipeBottomMiddle />}
      <Toaster />
      {/* <div className={style.textContainer}>
        <div className={style.container2}>
          <h1 className={style.title}>Bienvenido a Indico</h1>
          <p className={style.subtitle}>
            Una experiencia culinaria única donde la frescura de la naturaleza
            se fusiona con la excelencia de la alta cocina.
            <br />
            <b>Descubre su equilibrio perfecto.</b>
          </p>
          <button
            className={style.button}
            onClick={() => {
              setExit(true);
              setTimeout(() => {
                navigate("/store");
              }, 500);
            }}
          >
            Ver el menú
          </button>
        </div>
      </div> */}

      
      <div className={style.mouse}></div>
    </div>
  );
};

export default StartSection;
