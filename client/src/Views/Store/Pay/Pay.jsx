import { useEffect, useState } from "react";
import style from "./Pay.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import IconLoader from "../../../Components/iconLoader/iconLoader";
import { motion, transform } from "framer-motion";
import SwipeBottomMiddle from "../../../Components/pageAnimations/swipeUp/Exit/swipeUp";

const Pay = () => {
  const [orderNumber, setOrderNumber] = useState(0);
  const [payState, setPayState] = useState("notSend");
  const order = JSON.parse(window.sessionStorage.getItem("order"));
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const [step, setStep] = useState(1);

  const [orderReady, setOrderReady] = useState(false);
  const [foodReceived, setFoodReceived] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(
    window.sessionStorage.getItem("purchase_completed")
      ? window.sessionStorage.getItem("purchase_completed")
      : window.sessionStorage.setItem("purchase_completed", "false")
  );
  useEffect(() => {
    if (purchaseCompleted == "true") {
      setStep(3);
    }
  }, []);
  const changeSteps = () => {
    switch (step) {
      case 1:
        setStep(2);
        hour();
        window.sessionStorage.setItem("purchase_completed", false);

        break;
      case 2:
        setStep(3);
        break;
      case 3:
        setStep(1);
        break;
      default:
        setStep(1);
        break;
    }
  };

  const fetchOrderNumber = async () => {
    const response = await axios.get(
      `https://indico-backend.onrender.com/store/clients?waiting=${purchases}`
      // `http://localhost:3001/store/clients?waiting=purchases`
    );
    setOrderNumber(response.data + 1);
  };

  useEffect(() => {
    fetchOrderNumber();
  }, []);

  const paySuccess = async () => {
    if (payState == "notSend") {
      setPayState("Sending");
      try {
        const token = Cookies.get("session_token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado de autorización
            "Content-Type": "application/json", // Establece el tipo de contenido como JSON
          },
        };
        const res = await axios.post(
          "https://indico-backend.onrender.com/client/pay",
          order,
          config
        );
        console.log(order);
        setPayState("Sent");
      } catch (err) {
        console.log(err.response);
        setPayState("notSent");
      }
    }
  };

  const hour = () => {
    let now = new Date();
    let result;
    if (window.sessionStorage.getItem("pickUpFood") == null) {
      const futureTime = new Date(now.getTime() + 20 * 60000); // Sumamos 60000 milisegundos (1 minuto) al tiempo actual
      window.sessionStorage.setItem("pickUpFood", futureTime);
    } else {
      const futureTime = new Date(window.sessionStorage.getItem("pickUpFood"));
      const futureHours = futureTime.getHours();
      const futureMinutes = futureTime.getMinutes();
      const formattedHours = String(futureHours).padStart(2, "0");
      const formattedMinutes = String(futureMinutes).padStart(2, "0");
      result = `${formattedHours}:${formattedMinutes}`;
    }

    const futureTime = new Date(window.sessionStorage.getItem("pickUpFood"));

    const intervalId = setInterval(() => {
      now = new Date();
      if (now > futureTime) {
        clearInterval(intervalId);
        setOrderReady(true);
      }
    }, 1000);

    return result;
  };

  const step3Handler = () => {
    setFoodReceived(true);
    setTimeout(() => {
      setPurchaseCompleted(
        window.sessionStorage.setItem("purchase_completed", true)
      );
      setStep(3);
      window.sessionStorage.removeItem("pickUpFood");
    }, 500);
  };

  const finish = () => {
    window.sessionStorage.removeItem("order");
    window.sessionStorage.removeItem("order");
    window.sessionStorage.removeItem("cartItems");
    window.localStorage.removeItem("cartItems");
  };

  const [isExit, setExit] = useState(false);
  const exitHandler = () => {
    setExit(true);
    setTimeout(() => {
      navigate("/store");
    }, 500);
  };
  return (
    <div className={style.component}>
      <motion.div
        className={style.pantalla}
        initial={{ y: 0 }} // Estilo inicial
        animate={{ y: 1000 }}
        exit={{ y: 0 }} // Estilo final cuando el componente se monta // Estilo final cuando el componente se desmonta
        transition={{ duration: 0.5, delay: 0.5 }} // Duración de la transición
      />
      {isExit == true && <SwipeBottomMiddle />}
      {order ? (
        <div
          className={
            foodReceived == false
              ? style.contentCard
              : style.contentCardanimation
          }
        >
          {step == 1 && (
            <motion.div
              className={style.orderCard}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className={style.header}>
                <div className={style.headerContent}>
                  <button
                    onClick={exitHandler}
                    className={style.arrow}
                    title="Editar carrito"
                  >
                    <svg height="1.2em" viewBox="0 0 512 512">
                      <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
                    </svg>
                  </button>
                  <p>Orden #{orderNumber}</p>
                  <div style={{ filter: "opacity(0)" }}>ba</div>
                </div>
              </div>
              <div className={style.cartElements}>
                {order.orders.map(
                  ({ id, title, price, discount, image, quantity, total }) => (
                    <div key={id} className={style.dataContainer}>
                      <div>
                        <img
                          src={image}
                          alt=""
                          className={style.imgContainer}
                        />
                      </div>
                      <div className={style.test}>
                        <div className={style.data1}>
                          <p className={style.titleItem}>{title}</p>
                          <p className={style.quantityItem}>
                            {quantity > 1
                              ? `${quantity} unidades`
                              : `${quantity} unidad`}
                            {discount ? ` | ${discount}% off` : null}
                          </p>
                        </div>
                        <div className={style.data2}>
                          <p className={style.totalItem}>${total}</p>
                          <p className={style.priceItem}>
                            {quantity > 1 ? `$${price} c/u` : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className={style.resumeContent}>
                <div
                  className={`${style.svgModal} ${
                    modal === true ? style.svgModal : style.svgModalHidden
                  }`}
                >
                  <p>Subtotal: ${order.payData.food}</p>
                  <p>Servicio: ${order.payData.service}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15px"
                  widtht="15px"
                  viewBox="0 0 512 512"
                  fill="rgb(170, 170, 170)"
                  className={style.totalSvg}
                  onMouseEnter={() => setModal(true)}
                  onMouseLeave={() => setModal(false)}
                >
                  <path d="M504 256c0 137-111 248-248 248S8 393 8 256C8 119.1 119 8 256 8s248 111.1 248 248zM262.7 90c-54.5 0-89.3 23-116.5 63.8-3.5 5.3-2.4 12.4 2.7 16.3l34.7 26.3c5.2 3.9 12.6 3 16.7-2.1 17.9-22.7 30.1-35.8 57.3-35.8 20.4 0 45.7 13.1 45.7 33 0 15-12.4 22.7-32.5 34C247.1 238.5 216 254.9 216 296v4c0 6.6 5.4 12 12 12h56c6.6 0 12-5.4 12-12v-1.3c0-28.5 83.2-29.6 83.2-106.7 0-58-60.2-102-116.5-102zM256 338c-25.4 0-46 20.6-46 46 0 25.4 20.6 46 46 46s46-20.6 46-46c0-25.4-20.6-46-46-46z" />
                </svg>
                <p className={style.totalText}>Total:</p>
                <p className={style.totalNumber}>
                  ${order.payData.allTogether}
                </p>
              </div>
              <div className={style.payButtonsContainer}>
                <button
                  className={style.cash}
                  onClick={() => {
                    changeSteps();
                    hour();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="black"
                    viewBox="0 0 16 16"
                    className={style.svgEfectivo}
                  >
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
                  </svg>
                  Efectivo
                </button>
                <button className={style.mercadoPago}>
                  <img
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/v1730731882/Projects%20Images/Indico/Store%20image%20backgrounds_utils/MP_RGB_HANDSHAKE_color-azul_hori-izq_bmpcqk.png"
                    alt=""
                    className={style.mpImg}
                  />
                </button>
              </div>
            </motion.div>
          )}
          {step == 2 && (
            <div className={style.orderCard2}>
              <div className={style.header}>
                <div className={style.headerContent}>
                  <button
                    onClick={() => setStep(1)}
                    className={style.arrow}
                    title="Editar carrito"
                  >
                    <svg height="1.2em" viewBox="0 0 512 512">
                      <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
                    </svg>
                  </button>
                  <p>Orden #104</p>
                  <div style={{ filter: "opacity(0)" }}>ba</div>
                </div>
              </div>
              <motion.div
                className={style.step2Container}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className={style.stepsNumber}>
                  <p className={style.step1}>1</p>
                </div>
                <div className={style.stepsText}>
                  <div>
                    {orderReady == false ? (
                      <p>
                        Tu pedido estará listo aproximadamente a las {hour()}
                      </p>
                    ) : (
                      <p>Tu pedido ya está listo.</p>
                    )}
                  </div>
                </div>
                <div className={style.stepsNumber}>
                  <p className={style.step1}>2</p>
                </div>
                <div className={style.stepsText}>
                  <div>
                    <p>
                      Pasa por el restaurante y muestrale el número de pedido al
                      encargado.
                    </p>
                  </div>
                </div>
                <div className={style.stepsNumber}>
                  <p className={style.step1}>3</p>
                </div>
                <div className={style.stepsText}>
                  <div>
                    <p>
                      Paga ${order.payData.allTogether} en efectivo y en un
                      momento te entregarán tu pedido.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className={style.finish}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {payState == "notSend" && (
                  <button
                    className={style.finishButton}
                    onClick={() => paySuccess()}
                  >
                    Ya pagué
                  </button>
                )}
                {payState == "Sending" && (
                  <button className={style.finishButtonSending}>
                    <IconLoader />
                  </button>
                )}
                {payState == "Sent" && (
                  <button className={style.finishButton} onClick={step3Handler}>
                    Ya recibí mi pedido
                  </button>
                )}
              </motion.div>
            </div>
          )}
          {window.sessionStorage.getItem("purchase_completed") == "true" && (
            <div className={style.orderCard3}>
              <div className={style.orderCard3Content}>
                <div className={style.placeholderImg2Container}>
                  <img
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/q_10/v1729184359/Projects%20Images/Indico/Store%20image%20backgrounds_utils/Pay%20finished.webp"
                    alt=""
                    className={style.placeholderImg2}
                  />
                </div>
                <div className={style.step3TextContainer}>
                  <p className={style.step3Text}>
                    Muchas gracias por tu compra!
                  </p>
                </div>
                <div className={style.step3buttonContainer}>
                  <button
                    className={style.step3buttonAux}
                    onClick={() => {
                      setExit(true);
                      setTimeout(() => {
                        navigate("/home");
                        finish();
                      }, 1000);
                    }}
                  >
                    Ir al inicio
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
                    Seguir comprando
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={style.contentCard2}>
          <img
            src="https://i.ibb.co/55SsrX2/Order-food-bro.png"
            alt=""
            className={style.placeholderImg}
          />
          <p>Aún no hiciste ningún pedido, pásate por la tienda!</p>
          <button className={style.placeholderButton} onClick={exitHandler}>
            Ir a la tienda
          </button>
        </div>
      )}
    </div>
  );
};

export default Pay;
