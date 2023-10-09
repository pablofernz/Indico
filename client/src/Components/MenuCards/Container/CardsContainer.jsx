//Este componente agarra un array de juegos y por cada uno renderiza un componente Card
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const Cards = () => {
  const dishes = useSelector((state) => state.menu);
  console.log(dishes);

  return (
    <div className={style.Cards}>
      {dishes.map(({ _id, title, description, image, price, discount }) => {
        return (
          <Card
            id={_id}
            key={_id}
            title={title}
            image={image}
            description={description}
            price={price}
            discount={discount}
          />
        );
      })}
    </div>
  );
};

export default Cards;
