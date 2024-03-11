import { useSelector } from "react-redux";
import MenuGrid from "./Grid/MenuGrid";
import { useEffect } from "react";
import MenuList from "./List/MenuList";

const Menu = () => {
  const visual = useSelector((state) => state.storeView);
  
  useEffect(() => {
    console.log(visual);
  }, [visual]);

  return <div> {visual == "grid" ? <MenuGrid /> : <MenuList/>}</div>;
};

export default Menu;
