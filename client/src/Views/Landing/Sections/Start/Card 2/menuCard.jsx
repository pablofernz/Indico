import style from "./menuCard.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const MenuCard = () => {
  const dishes = useSelector((state) => state.menu);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < dishes.length - 1 ? prevIndex + 1 : 0
      );
    }, 10000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [dishes]);

  // Verificar si reviews está definido y no está vacío
  if (!dishes || dishes.length === 0) {
    return null; // Otra acción, mensaje de carga, etc.
  }

  const test = dishes[currentIndex];

  // Verificar si test está definido antes de acceder a sus propiedades
  if (!test) {
    return null; // Otra acción, mensaje de carga, etc.
  }

  return (
    <div>
      <div className={style.card}>
        <span className={style.cardHighlight}></span>
        <div className={style.header}>
          {test.image && (
            <img src={test.image} alt="xd" className={style.image} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
