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
                <button
                  onClick={userDropdownHandler}
                  className={style.userImgContainer}
                >
                  {userData && (
                    <img
                      width="35"
                      height="35"
                      src={userData.image}
                      alt="user-male-circle"
                    />
                  )}
                  <div className={style.dropdownIndicator}>
                    <motion.svg
                      animate={{
                        rotate: isUserDropdownOpen == true ? 180 : 0,
                        strokeWidth: 3,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black "
                      width="18"
                      height="18"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </motion.svg>
                  </div>
                </button>
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
                                  fillRule="evenodd"
                                  d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
                                  clipRule="evenodd"
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
                                navigate("/store/reviews");
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
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </motion.div>
  );
};

export default NavBar;
