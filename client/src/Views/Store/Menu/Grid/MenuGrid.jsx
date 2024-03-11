import style from "./MenuGrid.module.css";
import Card from "../../../../Components/MenuCards/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CardSkeleton from "../../../../Components/MenuCards/CardSkeleton/CardSkeleton";

const MenuGrid = () => {
  const dishes = useSelector((state) => state.menu);
 

  return (
    <div className={style.MenuComponent}>
      {dishes.length !== 0 ? (
        <div className={style.MenuContainer}>
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
      ) : (
        <div className={style.SkeletonContainer}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </div>
  );
};

export default MenuGrid;
