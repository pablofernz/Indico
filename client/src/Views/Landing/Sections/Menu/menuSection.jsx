import Cards from "../../../../Components/MenuCards/Container/CardsContainer";
import style from "./menuSection.module.css"

const MenuSection = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Nuestro menú:</h1>
      <Cards />
    </div>
  );
};

export default MenuSection;
