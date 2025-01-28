import { useSelector } from "react-redux";
import { useEffect, useState, lazy, Suspense, startTransition } from "react";
import { useDispatch } from "react-redux";
const MenuGrid = lazy(() => import("./Grid/MenuGrid"));
const MenuList = lazy(() => import("./List/MenuList"));
import { setGrid, setList } from "../../../Redux/actions";

const Menu = ({setExit}) => {
  const visual = useSelector((state) => state.storeView);
  const dispatch = useDispatch();
  const [esMovil, setEsMovil] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const actualizarEstado = () => {
      startTransition(() => {
        setEsMovil(window.innerWidth <= 700);
      });
    };

    window.addEventListener("resize", actualizarEstado);

    return () => {
      window.removeEventListener("resize", actualizarEstado);
    };
  }, []);

  useEffect(() => {
    startTransition(() => {
      if (esMovil) {
        dispatch(setList());
      } else {
        dispatch(setGrid());
      }
    });
  }, [esMovil, dispatch]);

  return (
    <div>
      {/* Envuelve el renderizado perezoso en un Suspense con fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        {visual === "grid" && <MenuGrid setExit={setExit} />}
        {visual === "list" && <MenuList />}
      </Suspense>
    </div>
  );
};

export default Menu;
