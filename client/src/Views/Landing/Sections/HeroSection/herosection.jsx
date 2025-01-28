import { useRef, useState } from "react";
import style from "./herosection.module.css";
import { motion, AnimatePresence } from "framer-motion";
import SwipeBottomMiddle from "../../../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import useViewportWidth from "../../../../Hooks/useViewportWidth";

const HeroSection = ({ storeData, setExit, navigate }) => {
  const ref = useRef(null);
  const [actualFoodType, setActualFoodType] = useState(0);
  const foodTypes = [
    {
      es: "desayuno",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1728596079/Projects%20Images/Indico/Food%20images/Tostadas%20Francesas.webp",
    },
    {
      es: "almuerzo",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1730739659/Projects%20Images/Indico/Food%20Images/buvan0x49ot9qf6nw3gk.webp",
    },
    {
      es: "bebidas",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1734041346/Projects%20Images/Indico/Food%20Images/bqvrd7pe8jhbebo0kfly.webp",
    },

    {
      es: "postre",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/v1728596048/Projects%20Images/Indico/Food%20images/Tiramis%C3%BA.jpg",
    },
    {
      es: "cena",
      url: "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1728596104/Projects%20Images/Indico/Food%20images/Pizza%20Napolitana.webp",
    },
  ];

  return (
    <div className={style.heroSection}>
      <div className={style.container}>
        {useViewportWidth() > 700 && (
          <div className={style.leftSide}>
            <button
              onClick={() => {
                setExit(true);
                setTimeout(() => {
                  navigate("/store");
                }, 500);
              }}
            >
              <span className={style.doodle5}>
                <svg
                  class="w-10 h-10"
                  viewBox="0 0 69 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.563538 86.4441C9.62047 89.2172 16.6734 91.0373 25.3582 87.062C32.131 83.9619 38.9967 80.1472 44.485 75.0561C50.4537 69.5194 57.9022 61.3399 53.1364 53.1378C49.3227 46.5744 43.2597 40.2549 43.2597 32.3089C43.2597 23.5235 48.7541 18.3068 54.9775 12.9941C58.6952 9.82034 63.0893 5.84965 65.693 1.65486C66.8291 -0.175672 57.9801 2.37935 56.7613 2.69535C56.4809 2.76805 57.7534 3.40302 58.0609 3.80379C59.7892 6.05612 60.7498 8.83608 62.4864 11.1169C66.0039 15.7368 66.9283 3.54324 68.4493 1.40005"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <p>Conocé nuestros platos</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="45"
                width="45"
                style={{ rotate: "-45deg" }}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <div className={style.rightSide}>
          <div className={style.top}>
            <div className={style.textContainer}>
              <p className={style.title}>
                SABORES REALES PARA PERSONAS REALES{" "}
                {useViewportWidth() > 700 && (
                  <div className={style.doodlesContainer}>
                    <span className={style.doodle1}>
                      <svg
                        height="50"
                        width="50"
                        class="w-10 h-10"
                        viewBox="0 0 82 84"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M41.5816 1.21606C39.7862 5.82482 40.3852 10.0977 40.5593 14.9633C40.7854 21.2812 40.9774 27.5593 41.4363 33.8661"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                        <path
                          d="M41.0651 45.1798C39.7505 51.5096 40.3418 57.6794 40.8893 64.0791C41.4093 70.1568 42.1389 76.2117 42.8566 82.2682"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1.13413 46.6647C5.16696 44.8703 8.96881 44.7974 13.3092 44.5029C19.8761 44.0572 26.2025 43.2089 32.656 41.952"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                        <path
                          d="M47.2629 40.0959C58.4139 39.3819 69.3895 37.5305 80.4472 35.9965"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                        <path
                          d="M49.3429 34.6508L52.917 28.1667"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                        <path
                          d="M32.9786 50.3504L28.6387 54.6391"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                        <path
                          d="M52.6361 48.6656L56.9506 51.5758"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                        <path
                          d="M31.549 30.8471C26.8741 29.4323 22.7143 27.3543 18.2738 25.3586"
                          stroke="currentColor"
                          strokeWidth="1.90596"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <span className={style.doodle2}>
                      <svg
                        class="w-10 h-10"
                        viewBox="0 0 74 109"
                        height="50"
                        width="50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M55.0706 52.3425C50.7432 53.5445 46.6801 55.227 45.5864 49.797C44.9342 46.5587 46.0803 43.8303 48.9537 42.12C60.557 35.2137 69.7942 49.3561 64.2963 59.6783C60.373 67.0441 51.9742 70.8717 43.9331 70.8435C32.9838 70.805 30.1659 58.4863 31.8185 49.2822C33.62 39.2488 41.6651 29.5934 52.7712 30.9932C66.7785 32.7586 75.3694 49.0543 71.3579 61.9149C67.4228 74.5305 58.2785 85.7482 45.3139 89.5685C38.6993 91.5177 30.526 92.3787 23.7354 90.8019C13.8653 88.51 9.14429 78.6332 6.93529 69.606C3.5431 55.7438 12.3064 41.8645 21.8317 32.5193C31.7501 22.7884 44.0068 17.8495 57.7353 22.4623C70.5224 26.7588 73.195 39.5421 72.3209 51.5915C70.8469 71.9107 59.2821 88.729 43.3618 101.061C28.8636 112.291 5.54663 110.793 2.169 89.8895C0.0943269 77.0499 2.31608 62.9136 6.8061 50.8123C10.6611 40.4224 16.6368 30.5412 23.913 22.1959C38.7061 5.22938 32.2335 16.2863 48.2027 1"
                          stroke="currentColor"
                          stroke-width="1.15035"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <span className={style.doodle3}>
                      <svg
                        class="w-10 h-10"
                        height="50"
                        width="50"
                        viewBox="0 0 99 91"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M46.5897 90C32.2617 82.5795 21.668 75.8216 13.4112 62.0208C9.00167 54.6506 4.91717 47.0127 2.69169 38.6607C-0.54097 26.5288 0.793624 10.3852 12.9895 3.52983C28.1392 -4.9859 49.2008 9.31642 45.2853 26.7698C45.1636 27.3123 43.6421 30.6293 44.4297 28.79C48.6716 18.8834 61.263 9.74938 71.1476 6.48662C86.7877 1.32402 97.7846 9.63273 97.1912 26.0637C96.7624 37.9369 88.4709 51.895 80.1949 60.0373C70.4344 69.6401 57.315 75.4033 50.4294 87.5728"
                          stroke="currentColor"
                          stroke-width="1.83638"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>

                    <span className={style.doodle4}>
                      <svg
                        class="w-10 h-10"
                        height="50"
                        width="50"
                        viewBox="0 0 75 75"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.60982 4.61425C9.03933 0.254888 16.6641 -0.166313 25.5475 2.87381C29.1936 4.12159 33.031 5.94682 36.912 8.30032C31.4565 11.5551 25.9202 15.8172 20.6955 20.9591C15.471 26.1009 11.1212 31.5683 7.77979 36.9711C5.48856 33.053 3.72483 29.187 2.53541 25.5215C-0.362539 16.5907 0.180307 8.97362 4.60982 4.61425ZM7.55216 37.3415C-0.439162 23.7644 -2.16531 10.7436 4.3406 4.34071C10.8465 -2.0622 23.8381 -0.128419 37.2861 8.07864C50.8631 0.0875643 63.8836 -1.63846 70.2864 4.86737C76.6893 11.3732 74.7556 24.3646 66.5488 37.8124C74.5399 51.3894 76.2659 64.41 69.7601 70.8128C63.2542 77.2156 50.2629 75.282 36.8152 67.0752C23.238 75.0666 10.2172 76.7928 3.81434 70.2868C-2.58853 63.7809 -0.654804 50.7894 7.55216 37.3415ZM36.4447 66.8476C32.5267 69.1389 28.6607 70.9026 24.9951 72.092C16.0643 74.99 8.44725 74.4471 4.08789 70.0176C-0.271479 65.5881 -0.692681 57.9633 2.34744 49.0799C3.59521 45.4339 5.4204 41.5966 7.77384 37.7156C11.0286 43.171 15.2906 48.7071 20.4323 53.9316C25.5742 59.1563 31.0418 63.5061 36.4447 66.8476ZM36.8188 66.6274C31.3895 63.2903 25.884 58.9239 20.7059 53.6624C15.5278 48.4011 11.25 42.8268 8.00005 37.3451C11.337 31.916 15.7034 26.4107 20.9647 21.2326C26.2262 16.0545 31.8006 11.7765 37.2825 8.52653C42.7116 11.8635 48.2168 16.2298 53.3948 21.4911C58.573 26.7526 62.8509 32.327 66.1009 37.8088C62.7639 43.2381 58.3975 48.7435 53.136 53.9216C47.8747 59.0996 42.3005 63.3775 36.8188 66.6274ZM37.1893 66.8536C41.0701 69.2069 44.9073 71.032 48.5532 72.2797C57.4366 75.3198 65.0613 74.8986 69.4909 70.5392C73.9204 66.1799 74.4632 58.5628 71.5653 49.632C70.3759 45.9666 68.6122 42.1008 66.3211 38.1829C62.9797 43.5857 58.6298 49.0533 53.4053 54.1951C48.1808 59.3369 42.6447 63.5988 37.1893 66.8536ZM66.3271 37.4383C68.6805 33.5575 70.5056 29.7202 71.7533 26.0743C74.7934 17.1909 74.3722 9.56609 70.0129 5.13658C65.6535 0.707074 58.0364 0.164229 49.1056 3.06217C45.4403 4.25155 41.5745 6.01518 37.6566 8.30627C43.0593 11.6477 48.5266 15.9974 53.6684 21.2219C58.8102 26.4465 63.0723 31.9828 66.3271 37.4383ZM37.0503 19.4421L37.3447 30.1037C37.4544 34.0751 40.648 37.2688 44.6195 37.3784L55.281 37.6728L44.6195 37.9672C40.648 38.0769 37.4544 41.2705 37.3447 45.242L37.0503 55.9035L36.7559 45.242C36.6463 41.2705 33.4526 38.0769 29.4812 37.9672L18.8196 37.6728L29.4812 37.3784C33.4526 37.2688 36.6463 34.0751 36.7559 30.1037L37.0503 19.4421Z"
                          fill="currentColor"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.60982 4.61425C9.03933 0.254888 16.6641 -0.166313 25.5475 2.87381C29.1936 4.12159 33.031 5.94682 36.912 8.30032C31.4565 11.5551 25.9202 15.8172 20.6955 20.9591C15.471 26.1009 11.1212 31.5683 7.77979 36.9711C5.48856 33.053 3.72483 29.187 2.53541 25.5215C-0.362539 16.5907 0.180307 8.97362 4.60982 4.61425ZM7.55216 37.3415C-0.439162 23.7644 -2.16531 10.7436 4.3406 4.34071C10.8465 -2.0622 23.8381 -0.128419 37.2861 8.07864C50.8631 0.0875643 63.8836 -1.63846 70.2864 4.86737C76.6893 11.3732 74.7556 24.3646 66.5488 37.8124C74.5399 51.3894 76.2659 64.41 69.7601 70.8128C63.2542 77.2156 50.2629 75.282 36.8152 67.0752C23.238 75.0666 10.2172 76.7928 3.81434 70.2868C-2.58853 63.7809 -0.654804 50.7894 7.55216 37.3415ZM36.4447 66.8476C32.5267 69.1389 28.6607 70.9026 24.9951 72.092C16.0643 74.99 8.44725 74.4471 4.08789 70.0176C-0.271479 65.5881 -0.692681 57.9633 2.34744 49.0799C3.59521 45.4339 5.4204 41.5966 7.77384 37.7156C11.0286 43.171 15.2906 48.7071 20.4323 53.9316C25.5742 59.1563 31.0418 63.5061 36.4447 66.8476ZM36.8188 66.6274C31.3895 63.2903 25.884 58.9239 20.7059 53.6624C15.5278 48.4011 11.25 42.8268 8.00005 37.3451C11.337 31.916 15.7034 26.4107 20.9647 21.2326C26.2262 16.0545 31.8006 11.7765 37.2825 8.52653C42.7116 11.8635 48.2168 16.2298 53.3948 21.4911C58.573 26.7526 62.8509 32.327 66.1009 37.8088C62.7639 43.2381 58.3975 48.7435 53.136 53.9216C47.8747 59.0996 42.3005 63.3775 36.8188 66.6274ZM37.1893 66.8536C41.0701 69.2069 44.9073 71.032 48.5532 72.2797C57.4366 75.3198 65.0613 74.8986 69.4909 70.5392C73.9204 66.1799 74.4632 58.5628 71.5653 49.632C70.3759 45.9666 68.6122 42.1008 66.3211 38.1829C62.9797 43.5857 58.6298 49.0533 53.4053 54.1951C48.1808 59.3369 42.6447 63.5988 37.1893 66.8536ZM66.3271 37.4383C68.6805 33.5575 70.5056 29.7202 71.7533 26.0743C74.7934 17.1909 74.3722 9.56609 70.0129 5.13658C65.6535 0.707074 58.0364 0.164229 49.1056 3.06217C45.4403 4.25155 41.5745 6.01518 37.6566 8.30627C43.0593 11.6477 48.5266 15.9974 53.6684 21.2219C58.8102 26.4465 63.0723 31.9828 66.3271 37.4383ZM37.0503 19.4421L37.3447 30.1037C37.4544 34.0751 40.648 37.2688 44.6195 37.3784L55.281 37.6728L44.6195 37.9672C40.648 38.0769 37.4544 41.2705 37.3447 45.242L37.0503 55.9035L36.7559 45.242C36.6463 41.2705 33.4526 38.0769 29.4812 37.9672L18.8196 37.6728L29.4812 37.3784C33.4526 37.2688 36.6463 34.0751 36.7559 30.1037L37.0503 19.4421Z"
                          fill="currentColor"
                          fill-opacity="0.2"
                        />
                      </svg>
                    </span>
                  </div>
                )}
              </p>
              <p className={style.subtitle}>
                Un restaurante único donde la frescura de la naturaleza se
                fusiona con la excelencia de la alta cocina. <br />
                <b>
                  Descubre nuestro equilibrio perfecto{" "}
                  {useViewportWidth() > 700 && (
                    <span>
                      <svg
                        class="w-10 h-10"
                        viewBox="0 0 102 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.9 6.29999L3.9 9.5L0 12.6V6.29999V0L3.9 3.20001L7.9 6.29999Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.9 6.29999L3.9 9.5L0 12.6V6.29999V0L3.9 3.20001L7.9 6.29999Z"
                          fill="currentColor"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M31.1998 6.29999L27.1998 9.5L23.2998 12.6V6.29999V0L27.1998 3.20001L31.1998 6.29999Z"
                          fill="currentColor"
                        />
                        <path
                          d="M31.1998 6.29999L27.1998 9.5L23.2998 12.6V6.29999V0L27.1998 3.20001L31.1998 6.29999Z"
                          fill="currentColor"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M54.4996 6.29999L50.5996 9.5L46.5996 12.6V6.29999V0L50.5996 3.20001L54.4996 6.29999Z"
                          fill="currentColor"
                        />
                        <path
                          d="M54.4996 6.29999L50.5996 9.5L46.5996 12.6V6.29999V0L50.5996 3.20001L54.4996 6.29999Z"
                          fill="currentColor"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M77.8004 6.29999L73.9004 9.5L69.9004 12.6V6.29999V0L73.9004 3.20001L77.8004 6.29999Z"
                          fill="currentColor"
                        />
                        <path
                          d="M77.8004 6.29999L73.9004 9.5L69.9004 12.6V6.29999V0L73.9004 3.20001L77.8004 6.29999Z"
                          fill="currentColor"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M101.2 6.29999L97.2002 9.5L93.2002 12.6V6.29999V0L97.2002 3.20001L101.2 6.29999Z"
                          fill="currentColor"
                        />
                        <path
                          d="M101.2 6.29999L97.2002 9.5L93.2002 12.6V6.29999V0L97.2002 3.20001L101.2 6.29999Z"
                          fill="currentColor"
                          fill-opacity="0.2"
                        />
                      </svg>
                    </span>
                  )}
                </b>
              </p>
            </div>
          </div>
          <div className={style.bottom}>
            <div className={style.bottomLeft}>
              <div className={style.customersContainer}>
                <div className={style.circle}>
                  <img
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734328374/adzf1lxwao2vcbrflkrb.webp"
                    alt="userImage"
                  />
                </div>
                <div className={style.circle}>
                  <img
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734333482/Projects%20Images/Indico/Clients%20Photos/INy9KCTX_400x400_s3q4vm.webp"
                    alt="userImage"
                  />
                </div>
                <div className={style.circle}>
                  <img
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1734333247/Projects%20Images/Indico/Clients%20Photos/hombre-joven-que-toma-el-selfie-94485959_x2hvo1.webp"
                    alt="userImage"
                  />
                </div>

                <div className={style.circle}>11+</div>
              </div>
              <p className={style.foodTypeText}>
                Más que clientes, parte de nuestra familia.
              </p>
              <div className={style.bottomShadow}></div>
            </div>

            <div className={style.bottomRight}>
              <div className={style.buttonsContainer}>
                <button
                  onClick={() => {
                    setActualFoodType(
                      actualFoodType == 0
                        ? foodTypes.length - 1
                        : actualFoodType - 1
                    );
                    // console.log(foodTypes.length);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="30"
                    width="30"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setActualFoodType(
                      actualFoodType == foodTypes.length - 1
                        ? 0
                        : actualFoodType + 1
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="30"
                    width="30"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className={style.foodTypeCard}>
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={foodTypes[actualFoodType].es}
                    src={foodTypes[actualFoodType].url}
                    alt="foodTypeImage"
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={foodTypes[actualFoodType].es}
                    className={style.foodTypeText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    #{foodTypes[actualFoodType].es.toUpperCase()}
                  </motion.p>
                </AnimatePresence>

                <div className={style.bottomShadow}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
