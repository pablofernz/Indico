import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.Landing}>
      <NavBar />

      <main>
        <section className={style.HomeSection} id="Home">
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

      <div className={style.button}>
        <a href="#Home">
          <svg>
            <svg
              className={style.arrow}
              data-name="1-Arrow Up"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              height={25}
            >
              <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
            </svg>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Landing;
