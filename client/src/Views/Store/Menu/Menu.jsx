import { useSelector } from "react-redux";
import MenuGrid from "./Grid/MenuGrid";
import { useEffect, useState } from "react";
import MenuList from "./List/MenuList";
import { useDispatch } from "react-redux";
import { setGrid, setList } from "../../../Redux/actions";

const Menu = () => {
  const visual = useSelector((state) => state.storeView);
  const dispatch = useDispatch();
  const [esMovil, setEsMovil] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const actualizarEstado = () => {
      setEsMovil(window.innerWidth <= 700);
    };

    window.addEventListener("resize", actualizarEstado);

    return () => {
      window.removeEventListener("resize", actualizarEstado);
    };
  }, []);

  useEffect(() => {
    if (esMovil) {
      dispatch(setList());
    } else {
      dispatch(setGrid());
    }
  }, [esMovil]);

  return <div> {visual == "grid" ? <MenuGrid /> : <MenuList />}</div>;
};

export default Menu;
