import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMenu, getReviews } from "../../Redux/actions";
import NavBar from "../../Components/Navbar/NavBar";
import style from "./Landing.module.css";
import ScrollTopButton from "../../Components/ScrollTopButton/ScrollTop";
import Footer from "../../Components/Footer/Footer";

import StartSection from "./Sections/Menu/Start/startSection";
import MenuSection from "./Sections/Menu/menuSection";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <div className={style.Landing}>
      <NavBar />

      <header>
        <section className={style.HomeSection} id="Start">
          <StartSection />
        </section>

        <section className={style.ServiceSection}>
          <div>Servicio</div>
        </section>

        <section className={style.MenuSection} id="Menu">
          <MenuSection />
        </section>

        <section className={style.ReviewsSection} id="Reviews">
          <div>Reviews</div>
        </section>

        <section className={style.RegisterSection} id="Register">
          <div>Registro</div>
        </section>
      </header>

      <ScrollTopButton />

      <Footer />
    </div>
  );
};

export default Landing;
