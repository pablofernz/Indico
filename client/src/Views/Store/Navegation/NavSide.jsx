import FoodType from "./FoodType/foodType";
import NavBarStore from "./NavbarStore/NavBarStore";
import Sidebars from "./SidebarsStore/sidebarsStore";
import style from "./navSide.module.css";

const NavSide = () => {
  return (
    <div className={style.background}>
      <div className={style.navbar}>
        <NavBarStore />
        <Sidebars />
        <FoodType />
      </div>
    </div>
  );
};

export default NavSide;
