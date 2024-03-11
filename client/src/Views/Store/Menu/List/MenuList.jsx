import style from "./MenuList.module.css";
import ItemList from "./itemList/itemList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SkeletonList from "./SkeletonList/SkeletonList";

const MenuList = () => {
  const dishes = useSelector((state) => state.menu);

  return (
    <div className={style.MenuComponent}>
      {dishes.length !== 0 ? (
        <div className={style.MenuContainer}>
          {dishes.map(({ _id, title, description, image, price, discount }) => {
            return (
              <ItemList
                id={_id}
                key={_id}
                title={title}
                image={image}
                description={description}
                price={price}
                discount={discount}
                className={style.MenuComponent2}
              />
            );
          })}
        </div>
      ) : (
        <div className={style.SkeletonContainer}>
          <SkeletonList className={style.MenuComponent2} />
          <SkeletonList className={style.MenuComponent2} />
          <SkeletonList className={style.MenuComponent2} />
          <SkeletonList className={style.MenuComponent2}/>

        </div>
      )}
    </div>
  );
};

export default MenuList;
