import { useState, useEffect } from "react";
import style from "./foodType.module.css";

const FoodType = () => {
  const [chosenOption, setChosenOption] = useState("Todos");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const Option = (name) => {
    setChosenOption(name);
  };

  useEffect(() => {
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(chosenOption);
  }, [chosenOption]);

  const handleCreated = (event) => {
    setChosenOption(event.target.value);
  };

  return (
    <div className={style.Component}>
      <div>
        {isMobile ? (
          <div className={style.foodTypeComponent}>
            <div className={style.foodTypeContainer}>
              <select
                onChange={handleCreated}
                value={chosenOption}
                className={style.OrderBar}
              >
                <option value={"Todos"}> Todos </option>
                <option value="Desayuno"> Desayuno </option>
                <option value="Almuerzo">Almuerzo</option>
                <option value="Cena">Cena</option>
                <option value="Postre">Postre</option>
                <option value="Bebidas">Bebidas</option>
              </select>
            </div>
          </div>
        ) : (
          <div className={style.foodTypeComponent}>
            <div className={style.foodTypeContainer}>
              <button
                className={
                  chosenOption == "Todos"
                    ? style.foodTypeChosed
                    : style.foodTypes
                }
                name="Todos"
                onClick={(event) => Option(event.target.name)}
              >
                Todos
              </button>
              <button
                className={
                  chosenOption == "Desayuno"
                    ? style.foodTypeChosed
                    : style.foodTypes
                }
                name="Desayuno"
                onClick={(event) => Option(event.target.name)}
              >
                Desayuno
              </button>
              <button
                className={
                  chosenOption == "Almuerzo"
                    ? style.foodTypeChosed
                    : style.foodTypes
                }
                name="Almuerzo"
                onClick={(event) => Option(event.target.name)}
              >
                Almuerzo
              </button>
              <button
                className={
                  chosenOption == "Cena"
                    ? style.foodTypeChosed
                    : style.foodTypes
                }
                name="Cena"
                onClick={(event) => Option(event.target.name)}
              >
                Cena
              </button>
              <button
                className={
                  chosenOption == "Postres"
                    ? style.foodTypeChosed
                    : style.foodTypes
                }
                name="Postres"
                onClick={(event) => Option(event.target.name)}
              >
                Postres
              </button>
              <button
                className={
                  chosenOption == "Bebidas"
                    ? style.foodTypeChosed
                    : style.foodTypes
                }
                name="Bebidas"
                onClick={(event) => Option(event.target.name)}
              >
                Bebidas
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <div className={style.menuComponent}>
        <div className={style.menuContainer}></div>
      </div> */}
    </div>
  );
};

export default FoodType;
