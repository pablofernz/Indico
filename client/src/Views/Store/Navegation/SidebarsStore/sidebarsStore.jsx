import { useDispatch, useSelector } from "react-redux";
import NavBarStore from "../NavbarStore/NavBarStore";
import style from "./sidebarsStore.module.css";
import React, { useEffect, useState } from "react";
import {
  deleteToCart,
  updateItemQuantity,
  sendTheOrder,
  clearCart,
  cartStatus,
} from "../../../../Redux/actions";
import IconLoader from "../../../../Components/iconLoader/iconLoader";
import { useNavigate } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";

const Sidebars = () => {
  const priceFilter = () => {};

  // - - - - - - - - - - C A R T - - - - - - - - - - - - - - - - -

  const [optionsStatus, setOptionsStatus] = useState("closed");
  // const [cartStatus, setCartStatus] = useState("closed");

  const navigate = useNavigate();

  const [orderSent, setOrderSent] = useState({
    orders: [],
    payData: {
      food: null,
      service: null,
      allTogether: null,
    },
  });
  const [isOrderSent, setIsOrderSent] = useState(false);
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const { foodInCart } = cartState;

  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  const cartIsOpen = useSelector((state) => state.cartIsOpen);

  const OptionStatus = () => {
    if (optionsStatus == "open") {
      setOptionsStatus("closed");
      dispatch(cartStatus(false));
    } else {
      setOptionsStatus("open");
      dispatch(cartStatus(false));
    }
  };

  const CartStatus = () => {
    if (cartIsOpen == true) {
      dispatch(cartStatus(false));
      setOptionsStatus("closed");
    } else {
      dispatch(cartStatus(true));
      setOptionsStatus("closed");
    }
  };

  const moreQuantity = (id) => {
    setIsOrderSent(false);

    const itemToUpdate = foodInCart.find((item) => item.id === id);
    const updatedQuantity = itemToUpdate.quantity + 1;

    dispatch(updateItemQuantity(id, updatedQuantity));

    const total = itemToUpdate.total * itemToUpdate.quantity;
  };

  const lessQuantity = (id) => {
    setIsOrderSent(false);

    const itemToUpdate = foodInCart.find((item) => item.id === id);
    const updatedQuantity = itemToUpdate.quantity - 1;

    dispatch(updateItemQuantity(id, updatedQuantity));

    if (updatedQuantity < 1) {
      dispatch(deleteToCart(itemToUpdate));
    }
  };

  useEffect(() => {
    if (foodInCart.length == 0) {
      setTimeout(() => {
        dispatch(cartStatus(false));
      }, 1000);
    }
  }, [foodInCart]);
  const calculateTotal = () => {
    let total = 0;
    foodInCart.forEach((item) => {
      const price = item.price;
      const discount = item.discount;
      const finalPrice = price - price * (discount / 100);
      const quantity = item.quantity;
      total += finalPrice * quantity;
    });
    setTotal(total);
  };

  const createOrder = () => {
    let ordersAux = [];
    let totalAux = [];
    foodInCart.forEach((item) => {
      const order = {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        discount: item.discount,
        quantity: item.quantity,
        total:
          Math.ceil(item.price - item.price * (item.discount / 100)) *
          item.quantity,
      };

      totalAux.push(order.total);
      ordersAux.push(order);
    });
    const suma = totalAux.reduce((total, numbers) => total + numbers, 0);
    setOrderSent((prevState) => ({
      ...prevState,
      orders: ordersAux, // Actualiza la propiedad 'prop2' con un nuevo valor
      payData: {
        food: suma,
        service: Math.floor((suma * (1 * 5)) / 100),
        allTogether: suma + Math.floor((suma * (1 * 5)) / 100),
      },
    }));
  };

  const checkoutOrder = () => {
    setIsOrderSent(true);
    dispatch(sendTheOrder(orderSent));
    const arrayString = JSON.stringify(orderSent);
    window.sessionStorage.setItem("order", arrayString);
  };

  useEffect(() => {
    setAmount(foodInCart.length);
    calculateTotal();
    createOrder();

    const cartItemsString = JSON.stringify(foodInCart);
    window.sessionStorage.setItem("cartItems", cartItemsString);
  }, [foodInCart]);

  const clearTheCart = () => {
    dispatch(clearCart());
    setIsOrderSent(false);
    setTimeout(() => {
      dispatch(cartStatus(false));
    }, 1000);
    window.sessionStorage.removeItem("order");
  };

  const [isExit, setExit] = useState(false);
  const exitHandler = () => {
    setExit(true);
    setTimeout(() => {
      navigate("/store/pay");
    }, 500);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("purchase_completed") == "true") {
      dispatch(cartStatus(false));
      dispatch(clearCart());
      window.sessionStorage.setItem("purchase_completed", "false");
    }
  }, []);

  return (
    <div className={style.store}>
      {isExit == true && (
        <motion.div
          className={style.pantalla}
          initial={{ y: -800 }} // Estilo inicial
          animate={{ y: 0 }}
          exit={{ y: 0 }} // Estilo final cuando el componente se monta // Estilo final cuando el componente se desmonta
          transition={{ duration: 0.5 }} // Duración de la transición
        />
      )}
      <div
        className={`${style.menuFilters} ${
          optionsStatus === "closed" ? style.open : style.closed
        }`}
      >
        <div className={style.button}>
          <label htmlFor="toggleMenu" className={style.hamburger}>
            <input id="toggleMenu" type="checkbox" onClick={OptionStatus} />

            <div className={style.filterSvg}>
              <svg viewBox="0 0 2292 2292" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45V858L211 365q-31-29-14-70 17-39 59-39h1280q42 0 59 39z"
                  fill="#74dba0"
                  class="fill-000000"
                ></path>
              </svg>
            </div>
          </label>
        </div>
        <div className={style.filterMenu}>
          <div className={style.filtersContainer}>
            <div className={style.filterTitle}>
              <p>Filtros</p>
            </div>

            <div className={style.orderOptions}>
              <p>Ordenar por:</p>
              <div className={style.filterPriceButtons}>
                <button onClick={priceFilter}>Mas caro</button>
                <button>Mas barato</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${style.menuCart} ${
          cartIsOpen == false ? style.cartOpen : style.cartClosed
        }`}
      >
        <button className={style.button2} onClick={CartStatus}>
          <span className={style.IconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              fill="rgb(130, 220, 147)"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>

            {amount > 0 ? (
              <div className={style.cartIndicator}>
                {amount > 0 ? <p>{amount}</p> : null}
              </div>
            ) : null}
          </span>
        </button>
        {foodInCart.length !== 0 ? (
          <motion.div
            className={style.cartCheckout}
            initial={{ opacity: 0 }} // Estilo inicial
            animate={{ opacity: 1 }}
            exit={{ y: 0 }} // Estilo final cuando el componente se monta // Estilo final cuando el componente se desmonta
            transition={{ duration: 0.5 }}
          >
            <div className={style.foodCheckout}>
              <div className={style.foodContent}>
                <LayoutGroup />
                {foodInCart.map(
                  ({ id, title, image, price, discount, quantity, total }) => (
                    <div key={id} className={style.dataContainer}>
                      <div>
                        <img src={image} alt="" className={style.dataImg} />
                      </div>
                      <div className={style.dataText}>
                        <p className={style.dataTitle}>{title}</p>
                        <p className={style.Price}>
                          $
                          {Math.ceil(price - price * (discount / 100)) *
                            quantity}
                          {discount === 0 ? null : (
                            <s className={style.strikedPrice}>
                              ${price * quantity}
                            </s>
                          )}
                        </p>
                      </div>
                      <div className={style.actionButtons}>
                        <div className={style.btnContainer}>
                          <button
                            className={style.btn}
                            onClick={() => lessQuantity(id)}
                            title="Disminuir"
                          >
                            -
                          </button>
                          <div className={style.quantityIndicator}>
                            {quantity}
                          </div>
                          <button
                            className={style.btn}
                            onClick={() => moreQuantity(id)}
                            title="Aumentar"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={style.foodCheckoutFade} />
            <div className={style.checkoutContainer}>
              <div className={style.checkoutContent}>
                <p className={style.summary}>Resumen del pedido</p>
                <div className={style.checkoutText}>
                  <div className={style.resume}>
                    {amount == 1 ? `${amount} orden` : `${amount} ordenes`}
                    <span className={style.priceCheckout}>{total}</span>
                  </div>
                  <div className={style.resume}>
                    Servicio de mesa{" "}
                    <span className={style.priceCheckout}>
                      ${Math.floor((total * (1 * 5)) / 100)}
                    </span>
                  </div>
                </div>
                <div className={style.total}>
                  Total:{" "}
                  <span className={style.priceCheckout}>
                    ${total + Math.floor((total * (1 * 5)) / 100)}
                  </span>
                </div>
              </div>
              <div className={style.payButtonContainer}>
                <button
                  className={style.clearCart}
                  onClick={clearTheCart}
                  title="Vaciar carrito"
                >
                  <svg
                    viewBox="0 0 448 512"
                    width="15"
                    height="15"
                    fill="rgb(230,230,230)"
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
                {isOrderSent ? (
                  <button className={style.payButton2} onClick={exitHandler}>
                    Pagar
                  </button>
                ) : (
                  <button
                    className={`${
                      isOrderSent ? style.payButtonChecked : style.payButton
                    }`}
                    onClick={checkoutOrder}
                  >
                    Confirmar pedido
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className={style.checkoutPlaceholder}>
            <div className={style.placeholderContainer}>
              <div className={style.imgContainer}>
                <img
                  className={style.imgCheckoutPlaceholder}
                  src="https://i.ibb.co/jfjrfym/Empty-cuate-1.png"
                  alt=""
                />
              </div>
              <p>El carrito está vacío</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebars;
