import React from "react";
import style from "./ScrollTop.module.css";

const ScrollTopButton = () => {
  return (
    <div className={style.button}>
      <a href="#Start">
        <svg>
          <svg
            data-name="1-Arrow Up"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="5 5 30 30"
            height={25}
            width={15}
          >
            <path
              fill="#c1c1c1"
              d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"
            />
          </svg>
        </svg>
      </a>
    </div>
  );
};

export default ScrollTopButton