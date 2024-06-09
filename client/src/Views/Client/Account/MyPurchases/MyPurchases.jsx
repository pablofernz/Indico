import style from "./MyPurchases.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const MyPurchases = () => {
  const navigate = useNavigate();

  const [isExit, setExit] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(window.sessionStorage.getItem("userData"))
  );

  //   const orderData = {
  //     purchaseID: userData.purchases[0].order[0].orders[0].id,
  //     date: userData.purchases[0].date,
  //     title: userData.purchases[0].order[0].orders[0].title,
  //     numberOfOrders: userData.purchases.length,
  //   };

  //   userData.purchases.map((order) => {
  //     const orderData = {
  //       date: order.date,
  //       order: order.map((order) => {
  //         title: order.orders[0].title;
  //       }),
  //     };
  //     console.log(orderData);
  //   });
  
  //   useEffect(() => {
  //     console.log(orderData);
  //   });

  return (
    <div className={style.accountComponent}>
      <div className={style.background} />
      <Toaster />

      {/* - - - - - - - - - - - - - CARD - - - - - - - - - - - - - - - - - -  */}

      <div className={style.cardContainer}>
        <div className={style.Card}>
          <motion.div
            className={style.CardSlider}
            initial={{ x: 0 }}
            animate={{ x: 1000 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {/* - - - - - - - - - - - - - BUTTONS - - - - - - - - - - - - - - - - - -  */}

          {isExit === true && (
            <motion.div
              className={style.CardSlider}
              initial={{ x: 600 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <div className={style.CardContent}>
            {!userData.purchases.length ? (
              <div className={style.noPurchaseContainer}>
                <div className={style.orderCard3Content}>
                  <div className={style.placeholderImg2Container}>
                    <img
                      src="https://i.ibb.co/WDJ34PW/pixelcut-export.png"
                      alt=""
                      className={style.placeholderImg2}
                    />
                  </div>
                  <div className={style.step3TextContainer}>
                    <p className={style.step3Text1}>No hay productos</p>
                    <p className={style.step3Text}>
                      Aún no hiciste ninguna compra, pásate por la tienda
                    </p>
                  </div>
                  <div className={style.step3buttonContainer}>
                    <button
                      className={style.step3buttonAux}
                      onClick={() => {
                        setExit(true);
                        setTimeout(() => {
                          navigate("/account");
                        }, 500);
                      }}
                    >
                      Atrás
                    </button>
                    <button
                      className={style.step3button}
                      onClick={() => {
                        setExit(true);
                        setTimeout(() => {
                          navigate("/store");
                          setTimeout(() => {
                            finish();
                          }, 500);
                        }, 500);
                      }}
                    >
                      Ir a la tienda
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>{userData.purchases[0].order[0].orders[0].title}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPurchases;
