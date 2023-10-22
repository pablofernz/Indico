import NavBarStore from "./NavbarStore/NavBarStore"
import style from "./Store.module.css"

const Store = () => {
  return (
    <div className={style.store}>
      <NavBarStore />
    </div>
  );
};

export default Store;
