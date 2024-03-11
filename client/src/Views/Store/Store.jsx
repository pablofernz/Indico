import { useEffect } from "react";
import Menu from "./Menu/Menu";
import NavSide from "./Navegation/NavSide";
import style from "./Store.module.css";
import { useDispatch } from "react-redux";
import { getMenu } from "../../Redux/actions";
import { useSelector } from "react-redux";

const Store = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <div className={style.background}>
      <NavSide />
      <Menu />
    </div>
  );
};

export default Store;
