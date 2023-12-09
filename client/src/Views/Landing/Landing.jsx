import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMenu, getReviews } from "../../Redux/actions";
import NavBar from "../../Components/Navbar/NavBar";
import style from "./Landing.module.css";
import ScrollTopButton from "../../Components/ScrollTopButton/ScrollTop";
import Footer from "../../Components/Footer/Footer";

import StartSection from "./Sections/Start/startSection";
import MenuSection from "./Sections/Menu/menuSection";
import ReviewContainer from "./Sections/Reviews/ReviewContainer/reviewContainer";
import ReviewsSection from "./Sections/Reviews/ReviewCard/reviewsSection";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div className={style.Landing}>
      <NavBar />

      <header>
        <section className={style.HomeSection} id="Start">
          <StartSection />
        </section>

        <section className={style.MenuSection} id="Menu">
          <div className={style.scrollDown}></div>
          {/* <MenuSection /> */}
          Menu
        </section>

        <section className={style.ReviewsSection} id="Reviews">
          <ReviewContainer/>
        </section>

        <section className={style.RegisterSection} id="Register">
          <div>Registro</div>
        </section>
      </header>

      {/* <ScrollTopButton /> */}

      <Footer />
    </div>
  );
};

export default Landing;
