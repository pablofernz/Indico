import React, { useRef, useState } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import SwipeBottomMiddle from "../pageAnimations/swipeUp/Exit/swipeUp";
import { getUserDataWithToken, validateToken } from "../../Redux/actions";

const NavBar = () => {
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;

  //     setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);

  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [prevScrollPos]);

  const [isOpen, setIsOpen] = useState("closed");

  const handleclick = () => {
    if (isOpen === "closed") {
      setIsOpen("open");
      console.log("Open");
    } else {
      setIsOpen("closed");
      console.log("Closed");
    }
  };

  const [isUserDropdownOpen, setUserDropdown] = useState(false);
  const [isExit, setExit] = useState(false);

  const userDropdownHandler = () => {
    setUserDropdown(!isUserDropdownOpen);
  };

  const [tokenStatus, setTokenStatus] = useState();

  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    const token = Cookies.get("session_token");
    try {
      if (token) {
        const response = await getUserDataWithToken(token);
        setUserData({
          id: response.data.id,
          name: response.data.name,
          lastname: response.data.lastname,
          image: response.data.image,
          email: response.data.email,
          reviews: response.data.reviews,
          purchases: response.data.purchases,
          createdAt: response.data.createdAt.split(" ")[0].replace(/-/g, "/"),
        });
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <motion.div
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      {isExit == true && <SwipeBottomMiddle />}
      <nav className={`${style.navbar} ${visible ? "" : style.hidden}`}>
        <div className={style.navbar}>
          <div className={style.logo}>
            <img
              className={style.logoImg}
              src="https://i.ibb.co/4JNx6NT/logo-bold-2.png"
              alt="logo"
            />
            <a>Indico.</a>
          </div>

          <ul className={style.menu}>
            <li className={style.btnsnav}>
              <a href="#Menu">Menú</a>
            </li>

            <li className={style.btnsnav}>
              <a href="#Reviews">Reseñas</a>
            </li>

            <li>
              <a>|</a>
            </li>
            {!Cookies.get("session_token") ? (
              <div className={style.enterButtons}>
                <li className={style.btnsnav}>
                  <a href="#Register">Registrate</a>
                </li>

                <li>
                  <a
                    className={style.Login}
                    onClick={() => {
                      setExit(true);
                      setTimeout(() => {
                        navigate("/login");
                      }, 500);
                    }}
                  >
                    Inicia Sesión
                  </a>
                </li>
              </div>
            ) : (
              <div className={style.userContainer}>
                <div className={style.userImgContainer}>
                  {userData && (
                    <img
                      width="35"
                      height="35"
                      style={{
                        borderRadius: "50px",
                        outline: "solid black 2px",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      src={userData.image}
                      alt="user-male-circle"
                      onClick={userDropdownHandler}
                    />
                  )}
                </div>
                <AnimatePresence>
                  {isUserDropdownOpen == true && (
                    <div style={{ scale: "1.1" }}>
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 100 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={style.dropdownContainer}
                      >
                        <div>
                          <button
                            className={style.dropdownOption}
                            onClick={() => {
                              setExit(true);
                              window.sessionStorage.setItem(
                                "from_landing",
                                true
                              );

                              setTimeout(() => {
                                navigate("/account");
                              }, 500);
                            }}
                          >
                            <p className={style.dropdownOptionsIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </p>

                            <p className={style.dropdownOptionsText}>
                              Mi cuenta
                            </p>
                          </button>
                          <button
                            className={style.dropdownOption}
                            onClick={() => {
                              setExit(true);
                              setTimeout(() => {
                                navigate("/store");
                              }, 500);
                            }}
                          >
                            <p className={style.dropdownOptionsIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="20"
                                height="20"
                              >
                                <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </p>

                            <p className={style.dropdownOptionsText}>Tienda</p>
                          </button>
                          <button
                            className={style.dropdownOption}
                            onClick={() => {
                              setExit(true);
                              setTimeout(() => {
                                navigate("/reviews");
                              }, 500);
                            }}
                          >
                            <p className={style.dropdownOptionsIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="20"
                                height="20"
                              >
                                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                              </svg>
                            </p>

                            <p className={style.dropdownOptionsText}>
                              Leer las reseñas
                            </p>
                          </button>
                          <div className={style.divider}>
                            <p></p>
                          </div>
                        </div>
                        <AnimatePresence>
                          {/* <motion.button
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 100 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.25, delay: 0.25 }}
                            className={style.dropdownContainer2}
                          >
                            <p className={style.dropdownOptionsIcon}>
                              <svg
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                width="18"
                                height="18"
                                style={{ transform: "rotate(180deg)" }}
                              >
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                              </svg>
                            </p>
                            <p className={style.dropdownOptionsText}>
                              Cerrar sesión
                            </p>
                          </motion.button> */}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className={style.navbar2}>
              <label className={style.burger} htmlFor="burger">
                <input type="checkbox" onClick={handleclick} id="burger" />
                <span></span>
                <span></span>
                <span></span>
              </label>

              <ul
                className={`${style.menuSmall} ${
                  isOpen === "open" ? style.open : style.closed
                }`}
              >
                <a
                  href="#Menu"
                  className={style.btnsnav2}
                  onClick={handleclick}
                >
                  Menú
                </a>
                <a
                  href="#Reviews"
                  className={style.btnsnav2}
                  onClick={handleclick}
                >
                  Reseñas
                </a>
                {!Cookies.get("session_token") && (
                  <a
                    href="#Register"
                    className={style.btnsnav2}
                    onClick={handleclick}
                  >
                    Regístrate
                  </a>
                )}

                {!Cookies.get("session_token") && (
                  <a
                    className={style.Login2}
                    onClick={() => navigate("/login")}
                  >
                    Inicia Sesión
                  </a>
                )}
              </ul>

              {/* {isOpen === "open" ? (
                <div className={style.menuSmallContainer}>
                  <ul className={style.menuSmall}>
                    <a href="#Menu" className={style.btnsnav2}>
                      Menú
                    </a>
                    <a href="#Reviews" className={style.btnsnav2}>
                      Reseñas
                    </a>
                    <a href="#Register" className={style.btnsnav2}>
                      Regístrate
                    </a>
                    <a
                      className={style.Login2}
                      onClick={() => navigate("/registro")}
                    >
                      Inicia Sesión
                    </a>
                  </ul>
                </div>
              ) : null} */}
            </div>
          </ul>
        </div>
      </nav>
    </motion.div>
  );
};

export default NavBar;
