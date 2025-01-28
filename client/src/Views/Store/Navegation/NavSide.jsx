import { useSelector } from "react-redux";
import FoodType from "./FoodType/foodType";
import NavBarStore from "./NavbarStore/NavBarStore";
import Sidebars from "./SidebarsStore/sidebarsStore";
import { useEffect } from "react";

const NavSide = () => {
  return (
    <div>
      <div>
        <NavBarStore />
        <Sidebars />
        <FoodType />
      </div>
    </div>
  );
};

export default NavSide;
