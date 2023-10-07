import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import style from "./Landing.module.css";
import ScrollTopButton from "../../Components/ScrollTopButton/ScrollTop";
const Landing = () => {
  return (
    <div className={style.Landing}>
      <NavBar />

      <main>
        <section className={style.HomeSection} id="Start">
          <div>Inicio</div>
        </section>

        <section className={style.ServiceSection}>
          <div>Servicio</div>
        </section>

        <section className={style.MenuSection} id="Menu">
          <div>Preview menú</div>
        </section>

        <section className={style.ReviewsSection} id="Reviews">
          <div>Reviews</div>
        </section>

        <section className={style.RegisterSection} id="Register">
          <div>Registro</div>
        </section>
      </main>

      <ScrollTopButton />
    </div>
  );
};

export default Landing;
