import { useState, useEffect } from "react";
import style from "./foodType.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setType } from "../../../../Redux/actions";

const FoodType = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.foodType);

  const [chosenOption, setChosenOption] = useState("Todos");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const selectType = (name) => {
    dispatch(setType(name));
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

  const handleCreated = (event) => {
    setChosenOption(event.target.value);
    selectType(event.target.value)
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
                <option value="Todos"> Todos </option>
                <option value="Desayuno"> Desayuno </option>
                <option value="Almuerzo">Almuerzo</option>
                <option value="Cena">Cena</option>
                <option value="Postre">Postre</option>
                <option
                  value="Bebidas"
                >
                  Bebidas
                </option>
              </select>
            </div>
          </div>
        ) : (
          <div className={style.foodTypeComponent}>
            <div className={style.foodTypeContainer}>
              <button
                className={
                  type == "Todos" ? style.foodTypeChosed : style.foodTypes
                }
                name="Todos"
                onClick={(event) => selectType(event.target.name)}
              >
                Todos
              </button>
              <button
                className={
                  type == "Desayuno" ? style.foodTypeChosed : style.foodTypes
                }
                name="Desayuno"
                onClick={(event) => selectType(event.target.name)}
              >
                Desayuno
              </button>
              <button
                className={
                  type == "Almuerzo" ? style.foodTypeChosed : style.foodTypes
                }
                name="Almuerzo"
                onClick={(event) => selectType(event.target.name)}
              >
                Almuerzo
              </button>
              <button
                className={
                  type == "Cena" ? style.foodTypeChosed : style.foodTypes
                }
                name="Cena"
                onClick={(event) => selectType(event.target.name)}
              >
                Cena
              </button>
              <button
                className={
                  type == "Postres" ? style.foodTypeChosed : style.foodTypes
                }
                name="Postres"
                onClick={(event) => selectType(event.target.name)}
              >
                Postres
              </button>
              <button
                className={
                  type == "Bebidas" ? style.foodTypeChosed : style.foodTypes
                }
                name="Bebidas"
                onClick={(event) => selectType(event.target.name)}
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
