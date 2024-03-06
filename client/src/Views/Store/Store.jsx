import NavBarStore from "./NavbarStore/NavBarStore";
import Sidebars from "./SidebarsStore/sidebarsStore";
import style from "./FoodComponent/foodComponent.module.css";
import FoodComponent from "./FoodComponent/foodComponent.jsx";

const Store = () => {
  return (
    <div className={style.background}>
      <NavBarStore />
      <Sidebars />
      <FoodComponent/>
    </div>
  );
};

export default Store;
