import React, { useRef, useState } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import SwipeBottomMiddle from "../pageAnimations/swipeUp/Exit/swipeUp";
import { validateToken } from "../../Redux/actions";

const NavBar = () => {
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 40);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

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

  // const tokenValidation = () => {
  //   const token = Cookies.get("session_token");
  //   try {
  //     if (token) {
  //       validateToken(token)
  //         .then(console.log("res"))
  //         .catch(console.log("error"));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   tokenValidation();
  // });

  return (
    <div>
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
                  <a className={style.Login} onClick={() => navigate("/login")}>
                    Inicia Sesión
                  </a>
                </li>
              </div>
            ) : (
              <div className={style.userContainer}>
                <div className={style.userImgContainer}>
                  <img
                    width="35"
                    height="35"
                    style={{
                      borderRadius: "50px",
                      outline: "solid black 2px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    src="https://i.ibb.co/Qk117ZF/391371615-732291472044335-3178734186415202019-n.jpg"
                    alt="user-male-circle"
                    onClick={userDropdownHandler}
                  />
                </div>
                <AnimatePresence>
                  {isUserDropdownOpen == true && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 100 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      autoFocus={console.log("xd")}
                      className={style.dropdownContainer}
                    >
                      <div>
                        <button
                          className={style.dropdownOption}

                          // onClick={() => {
                          //   setExit(true);
                          //   setTimeout(() => {
                          //     navigate("/account");
                          //   }, 500);
                          // }}
                        >
                          <p className={style.dropdownOptionsIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>

                          <p className={style.dropdownOptionsText}>Mi cuenta</p>
                        </button>
                        <button
                          className={style.dropdownOption}
                          onClick={() => {
                            setExit(true);
                            setTimeout(() => {
                              navigate("/account/purchases");
                            }, 500);
                          }}
                        >
                          <p className={style.dropdownOptionsIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>

                          <p className={style.dropdownOptionsText}>
                            Mis compras
                          </p>
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
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>

                          <p className={style.dropdownOptionsText}>
                            Mis reseñas
                          </p>
                        </button>
                        <div className={style.divider}>
                          <p></p>
                        </div>
                      </div>
                      <AnimatePresence>
                        <motion.button
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
                        </motion.button>
                      </AnimatePresence>
                    </motion.div>
                  )}
                  {/*  */}
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
    </div>
  );
};

export default NavBar;
