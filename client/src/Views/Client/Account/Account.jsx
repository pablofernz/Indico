import style from "./Account.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUserDataWithToken } from "../../../Redux/actions";
import { AnimatePresence, motion } from "framer-motion";
import SwipeBottomMiddle from "../../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import SwipeMiddleTop from "../../../Components/pageAnimations/swipeDown/Exit/swipeDown";

const AccountPage = () => {
  const [isExit, setExit] = useState(false);
  const [goLanding, setGoLanding] = useState(false);
  const [logoutOpen, setlogoutOpen] = useState(false);

  const navigate = useNavigate();
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
    // console.log(userData)
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("userData", JSON.stringify(userData));
    setTimeout(() => {
      window.sessionStorage.removeItem("from_landing");
    }, 1000);
  }, [userData]);

  return (
    <div className={style.accountComponent}>
      {window.sessionStorage.getItem("from_landing") && <SwipeMiddleTop />}
      {goLanding == true && <SwipeBottomMiddle />}
      <div className={style.background} />
      <AnimatePresence>
        {logoutOpen == true && (
          <motion.div
            className={style.reviewOpenModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {logoutOpen == true && (
          <motion.div
            className={style.reviewOpenModal2}
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            exit={{ y: 1000 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <div className={style.reviewContainer}>
              <div className={style.reviewModalContent}>
                <div className={style.imgReviewContainer}>
                  <img
                    className={style.imgReview}
                    src="https://i.ibb.co/VH8kxH1/Quitting-a-job-bro.png"
                    alt="LogoutImage"
                  />
                </div>
                <div className={style.reviewTextContainer}>
                  <p className={style.reviewText}>
                    ¿Ya te vas? Puedes volver a iniciar sesión más tarde
                  </p>
                </div>
                <div className={style.reviewButtonContainer}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={style.secundaryButton}
                    onClick={() => {
                      setTimeout(() => {
                        setGoLanding(true);
                        Cookies.remove("session_token");
                        navigate("/");
                      }, 500);
                    }}
                  >
                    Cerrar sesión
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={style.primaryButton}
                    onClick={() => {
                      setlogoutOpen(false);
                    }}
                  >
                    Quedarse
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={style.accountCard}>
        <motion.div
          className={style.CardSlider}
          initial={{ x: 0 }}
          animate={{ x: -600 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        {isExit === true && (
          <motion.div
            className={style.CardSlider}
            initial={{ x: -600 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <div className={style.accountCardContent}>
          <button
            className={style.back}
            onClick={() => {
              setGoLanding(true);
              setTimeout(() => {
                navigate("/");
              }, 500);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width="35"
              height="35"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <header className={style.photoSection}>
            <div className={style.headerContent}>
              <picture className={style.photoContainer}>
                {userData ? (
                  <img
                    src={userData.image}
                    alt=""
                    className={style.userPhoto}
                  />
                ) : (
                  <div className={style.photoSkeleton} />
                )}
              </picture>
              {userData ? (
                <div className={style.xd}>
                  <p className={style.name}>
                    {userData.name} {userData.lastname}
                  </p>
                </div>
              ) : (
                <p className={style.nameSkeleton} />
              )}
              {userData ? (
                <p className={style.createdAt}>
                  Te uniste el {userData.createdAt}
                </p>
              ) : (
                <p className={style.createdAtSkeleton} />
              )}
            </div>
          </header>
          <main className={style.optionsSection}>
            <div className={style.optionsContainer}>
              <button
                className={style.dropdownOption}
                onClick={() => {
                  setExit(true);
                  setTimeout(() => {
                    navigate("/account/myinformation");
                  }, 500);
                }}
              >
                <p className={style.dropdownOptionsIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                    />
                  </svg>
                </p>

                <p className={style.dropdownOptionsText}>Datos personales</p>
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
                    fill="none"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </p>

                <p className={style.dropdownOptionsText}>Mis compras</p>
              </button>
              <button
                className={style.dropdownOption}
                // onClick={() => {
                //   setExit(true);
                //   setTimeout(() => {
                //     navigate("/reviews");
                //   }, 500);
                // }}
              >
                <p className={style.dropdownOptionsIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </p>

                <p className={style.dropdownOptionsText}>Mis reseñas</p>
              </button>
              <button
                className={style.dropdownOption}
                // onClick={() => {
                //   setExit(true);
                //   setTimeout(() => {
                //     navigate("/reviews");
                //   }, 500);
                // }}
              >
                <p className={style.dropdownOptionsIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </p>

                <p className={style.dropdownOptionsText}>Comidas favoritas</p>
              </button>

              <button
                className={style.logout}
                onClick={() => {
                  setlogoutOpen(true);
                  // setExit(true);
                  // setTimeout(() => {
                  //   navigate("/reviews");
                  // }, 500);
                }}
              >
                <p className={style.dropdownOptionsIcon}>
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    width="25"
                    height="25"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </p>

                <p className={style.dropdownOptionsText}>Cerrar sesión</p>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
