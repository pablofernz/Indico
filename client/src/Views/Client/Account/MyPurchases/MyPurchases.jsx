import style from "./MyPurchases.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import IconLoader from "../../../../Components/iconLoader/iconLoader";
import useViewportWidth from "../../../../Hooks/useViewportWidth";
import SwipeBottomMiddle from "../../../../Components/pageAnimations/swipeUp/Exit/swipeUp";

const PurchaseReceipt = ({ userData, dataForReceipt, setReceiptOpen }) => {
  const width = useViewportWidth();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setReceiptOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={style.receiptBackground}
    >
      {width > 800 && (
        <p className={style.exitp}>
          Presiona
          <button onClick={() => setReceiptOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M1 7h6v2H3v2h4v2H3v2h4v2H1zm10 0h4v2h-4v2h2a2 2 0 0 1 2 2v2c0 1.11-.89 2-2 2H9v-2h4v-2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2m8 0h2a2 2 0 0 1 2 2v1h-2V9h-2v6h2v-1h2v1c0 1.11-.89 2-2 2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2"
              />
            </svg>
          </button>
          para salir
        </p>
      )}
      <div className={style.receiptCard}>
        {width < 600 && (
          <button
            type="button"
            className={style.closeReceipt}
            onClick={() => {
              setReceiptOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="35"
              height="35"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
        <header>
          <p>
            {userData.name} {userData.lastname}
          </p>
          <p>•</p>
          <p>{dataForReceipt.date.split(" ")[0]}</p>
          <p>•</p>
          <p>{dataForReceipt.date.split(" ")[1]}hs</p>
        </header>
        <div className={style.title}>RECIBO</div>
        <main>
          <div className={style.foodDetailsContainer}>
            {dataForReceipt.orders.map((order) => (
              <div key={order.id} className={style.foodDetails}>
                <p>
                  {order.quantity} {order.title}
                </p>
                <p
                  className={style.price}
                  style={{
                    marginRight: dataForReceipt.orders.length >= 6 && "10px",
                  }}
                >
                  ${order.total}
                </p>
              </div>
            ))}

            <div className={style.foodDetails}>
              <p style={{ fontWeight: "600" }}>Servicio de mesa</p>
              <p
                className={style.price}
                style={{
                  fontWeight: "600",
                  marginRight: dataForReceipt.orders.length >= 6 && "10px",
                }}
              >
                ${dataForReceipt.payData.service}
              </p>
            </div>
          </div>
          <footer className={style.totalAmount}>
            <p>MONTO TOTAL</p>
            <p>${dataForReceipt.payData.allTogether}</p>
          </footer>
        </main>
        <footer>
          <picture className={style.barcodeContainer}>
            <img
              className={style.barcode}
              src="https://png.pngtree.com/png-clipart/20220620/original/pngtree-barcode-vector-design-png-image_8130545.png"
              alt=""
            />
            <img
              className={style.logoIndico}
              src="https://res.cloudinary.com/dnrprmypf/image/upload/q_0/v1718654737/Logo-light_v11oio.webp"
              alt=""
            />
          </picture>
        </footer>
      </div>
    </motion.div>
  );
};

const PurchaseFoodCard = ({
  purchasesData,
  setReceiptOpen,
  setDataForReceipt,
  setToStore,
}) => {
  const width = useViewportWidth();

  const repeatPurchaseHandler = () => {
    setToStore(true);
    window.sessionStorage.setItem(
      "cartItems",
      JSON.stringify(purchasesData.orders)
    );
    setTimeout(() => {
      window.location.href = "/store";
    }, 500);
  };

  const purch = [
    {
      id: "65ecaac33a9408dfcc0ab3f3",
      title: "Café con leche",
      image:
        "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1728596960/Projects%20Images/Indico/Food%20images/Caf%C3%A9%20con%20leche.jpg",
      description: "Café con leche, puede ser de vaca, almendras o coco",
      price: 1500,
      discount: 20,
      quantity: 1,
      total: 1200,
    },
    {
      id: "650c85c9bcf732c7bab3e70b",
      title: "Milanesa de pollo a caballo",
      image:
        "https://res.cloudinary.com/dnrprmypf/image//upload/q_auto:low/v1728595709/Projects%20Images/Indico/Food%20images/Milanesa%20a%20caballo.jpg",
      description:
        "Milanesa de pollo frita con jamon cocido, salsa de tomate, queso, huevo y albahaca",
      price: 2000,
      discount: 10,
      quantity: 1,
      total: 1800,
    },
  ];
  return (
    <div className={style.purchaseCard}>
      <header>
        <div
          className={style.leftSide}
          style={{
            paddingRight: purchasesData.orders.length > 1 ? "20px" : "0px",
          }}
        >
          {purchasesData.orders.slice(0, 2).map((order, index) => (
            <picture
              key={index}
              className={style.imgContainer}
              style={{
                marginRight: purchasesData.orders.length > 1 ? "-15px" : "0px",
              }}
            >
              <img src={order.image} alt={`imageFood-${index}`} />
            </picture>
          ))}

          {purchasesData.orders.length > 2 && (
            <div className={style.moreIndicatorContainer}>
              <p>{purchasesData.orders.length - 2}+</p>
            </div>
          )}
        </div>

        <div className={style.middleSide}>
          {purchasesData.orders.length >= 2 ? (
            <p>
              {purchasesData.orders[0].title} y{" "}
              {purchasesData.orders.length - 1}{" "}
              {purchasesData.orders[0].title.length > 20
                ? "más."
                : purchasesData.orders.length - 1 > 1
                ? "pedidos más."
                : "pedido más."}
            </p>
          ) : (
            <p>{purchasesData.orders[0].title}.</p>
          )}
          <div className={style.secondLineCard}>
            <p>${purchasesData.payData.allTogether}</p>
            <p>•</p>

            <p>{purchasesData.date.split(" ")[0]}</p>
            <p>•</p>
            <p>{purchasesData.date.split(" ")[1]}hs</p>
          </div>
        </div>

        {width >= 600 && (
          <div className={style.rightSide}>
            <button
              onClick={() => {
                setReceiptOpen(true);
                setDataForReceipt(purchasesData);
              }}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2"></path>
              </svg>
            </button>
          </div>
        )}
      </header>
      <footer>
        {width < 600 && (
          <button
            onClick={() => {
              setReceiptOpen(true);
              setDataForReceipt(purchasesData);
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="25"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2"></path>
            </svg>
            Recibo
          </button>
        )}
        {width < 600 && <>|</>}
        <button onClick={repeatPurchaseHandler}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            viewBox="0 0 15 15"
            height="15px"
            width="15px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
              fill="currentColor"
            ></path>
          </svg>
          Repetir
        </button>
      </footer>
    </div>
  );
};

const MyPurchases = () => {
  const navigate = useNavigate();

  const [isExit, setExit] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(window.localStorage.getItem("userData"))
  );
  const [purchasesData, setPurchasesData] = useState([]);

  const getPurchasesData = async () => {
    try {
      const response = await axios.get(
        `https://indico-backend.onrender.com/client/${userData.id}/mypurchases`
        // `http://localhost:3001/client/${userData.id}/mypurchases`
      );
      setPurchasesData(response.data.length ? response.data : null);
    } catch (error) {
      console.log(error);
      setPurchasesData(null);
    }
  };
  useEffect(() => {
    if (!Cookies.get("session_token")) {
      navigate("/login");
    } else {
      getPurchasesData();
    }
  }, []);

  const [receiptOpen, setReceiptOpen] = useState(false);
  const [dataForReceipt, setDataForReceipt] = useState();
  const [toStore, setToStore] = useState(false);

  return (
    <div className={style.accountComponent}>
      <div className={style.background} />

      <AnimatePresence mode="popLayout">
        {receiptOpen && (
          <>
            <PurchaseReceipt
              userData={userData}
              dataForReceipt={dataForReceipt}
              setReceiptOpen={setReceiptOpen}
            />
          </>
        )}
      </AnimatePresence>

      {toStore == true && <SwipeBottomMiddle />}

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

          <button
            type="button"
            className={style.back}
            onClick={() => {
              setExit(true);
              setTimeout(() => {
                navigate("/account");
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

          <header>
            <p>Historial de compras</p>
          </header>

          <main>
            <div className={style.upperShadow}></div>
            <div className={style.upperShadow}></div>
            <AnimatePresence mode="popLayout">
              {purchasesData?.map((purchase, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                  key={purchase._id}
                  className={style.purchaseCardContainer}
                >
                  <PurchaseFoodCard
                    purchasesData={purchase}
                    setReceiptOpen={setReceiptOpen}
                    setDataForReceipt={setDataForReceipt}
                    setToStore={setToStore}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {purchasesData == null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={style.errorComponent}
                >
                  <picture className={style.gifContainer}>
                    <img
                      src="https://res.cloudinary.com/dnrprmypf/image/upload/q_40/v1729553413/Projects%20Images/Indico/Store%20image%20backgrounds_utils/No%20purchase%20gif.webp"
                      alt="heart broke"
                    />
                  </picture>
                  <p className={style.errorText}>
                    Aún no hiciste ninguna compra <br />
                    <label>Pásate por la tienda!</label>
                  </p>

                  <button
                    onClick={() => {
                      setToStore(true);
                      window.sessionStorage.removeItem("cartItems");

                      setTimeout(() => {
                        navigate("/store");
                      }, 500);
                    }}
                    className={style.errorButton}
                  >
                    Ir a la Tienda
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {purchasesData !== null && !purchasesData?.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={style.errorComponent}
                >
                  <IconLoader color="rgb(42,42,42)" scale="1.5" />{" "}
                </motion.div>
              )}
            </AnimatePresence>

            <div className={style.bottomShadow}></div>
            <div className={style.bottomShadow}></div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default MyPurchases;
