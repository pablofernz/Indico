import { useEffect, useState } from "react";
import style from "./Pay.module.css";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const order = JSON.parse(window.sessionStorage.getItem("order"));
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  return (
    <div className={style.component}>
      {order ? (
        <div className={style.contentCard}>
          <div className={style.orderCard}>
            {/* Aca puedo trabajar en un posible "carrusel" haciendo que al apretar algun boton de pago, lleve a la etapa 2 y así */}
            <div className={style.header}>
              <div className={style.headerContent}>
                <button
                  onClick={() => navigate("/store")}
                  className={style.arrow}
                  title="Editar carrito"
                >
                  <svg height="1.2em" viewBox="0 0 512 512">
                    <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
                  </svg>
                </button>
                <p>Orden #104</p>
                <div style={{ filter: "opacity(0)" }}>back</div>
              </div>
            </div>
            <div className={style.cartElements}>
              <div className={style.foodCheckoutFade2} />

              {order.orders.map(
                ({ id, title, price, discount, image, quantity, total }) => (
                  <div key={id} className={style.dataContainer}>
                    <div>
                      <img src={image} alt="" className={style.imgContainer} />
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
              <div className={style.foodCheckoutFade} />
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
              <p className={style.totalNumber}>${order.payData.allTogether}</p>
            </div>
            <div className={style.divisory}>
              <p>Cómo quieres pagar?</p>
            </div>
            <div className={style.payButtonsContainer}>
              <button className={style.cash}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="black"
                  style={{ transform: "translateX(15px)" }}
                  viewBox="0 0 16 16"
                >
                  <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                  <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
                </svg>
                Efectivo
              </button>
              <button className={style.mercadoPago}>
                <img
                  src="https://camo.githubusercontent.com/e337b2417e4d45fad3aabe6d38451fdfbfea2c4d4ddec6d5f55d0cd15fb0c0b9/68747470733a2f2f7365656b6c6f676f2e636f6d2f696d616765732f4d2f6d65726361646f7061676f2d6c6f676f2d464339424137343230452d7365656b6c6f676f2e636f6d2e706e67"
                  alt=""
                  className={style.mpImg}
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.contentCard2}>
          <img
            src="https://i.ibb.co/55SsrX2/Order-food-bro.png"
            alt=""
            className={style.placeholderImg}
          />
          <p>Aún no hiciste ningún pedido, pásate por la tienda!</p>
          <button
            className={style.placeholderButton}
            onClick={() => navigate("/store")}
          >
            Ir a la tienda
          </button>
        </div>
      )}
    </div>
  );
};

export default Pay;
