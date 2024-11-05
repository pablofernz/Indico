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
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import useViewportWidth from "../../../../Hooks/useViewportWidth";

const Sidebars = () => {
  // - - - - - - - - - - C A R T - - - - - - - - - - - - - - - - -

  // const [optionsStatus, setOptionsStatus] = useState("closed");
  // const [cartStatus, setCartStatus] = useState("closed");
  const viewportWidth = useViewportWidth();
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem("userData"));

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

  const CartStatus = () => {
    if (cartIsOpen == true) {
      dispatch(cartStatus(false));
    } else {
      dispatch(cartStatus(true));
      if (foodInCart.length === 0) {
        setTimeout(() => {
          dispatch(cartStatus(false));
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("favorite_purchase")) {
      dispatch(cartStatus(true));
      setTimeout(() => {
        window.sessionStorage.removeItem("favorite_purchase");
      }, 1000);
    }
  }, []);

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
    if (JSON.parse(window.sessionStorage.getItem("cartItems")).length === 1) {
      window.sessionStorage.setItem("cartItems", "[]");
      setAmount(0);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (foodInCart.length < 1) {
        dispatch(cartStatus(false));
      }
    }, 1500);
  }, [foodInCart]);

  useEffect(() => {
    setTimeout(() => {
      if (foodInCart.length > 0) {
        dispatch(cartStatus(true));
      }
    }, 1500);
  }, []);

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
    const getDay = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
      return formattedDateTime;
    };

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
    // Solo ejecuta si foodInCart tiene elementos
    if (foodInCart.length >= 0) {
      setAmount(foodInCart.length);
      calculateTotal();
      createOrder();

      // Actualiza el sessionStorage solo si foodInCart no está vacío
      window.sessionStorage.setItem("cartItems", JSON.stringify(foodInCart));
      console.log(foodInCart);
    }
  }, [foodInCart]);

  const clearTheCart = () => {
    dispatch(clearCart());
    window.sessionStorage.setItem("cartItems", "[]");

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

  const [isUserDropdownOpen, setUserDropdown] = useState(false);

  const userDropdownHandler = () => {
    setUserDropdown(!isUserDropdownOpen);
  };

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
      <AnimatePresence>
        {viewportWidth <= 500 && foodInCart.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={style.bottomShadow}
          />
        )}
      </AnimatePresence>
      {/*- -------- FILTERS BUTTON --------------- */}
      <div className={style.backButton}>
        <button
          onClick={() => {
            setExit(true);
            setTimeout(() => {
              navigate("/home");
            }, 500);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {viewportWidth <= 500 && foodInCart.length > 0 && (
          <motion.button
            key="smallViewportCartButton"
            initial={{ opacity: 0, y: 100 }}
            exit={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={style.smallViewportCartButton}
            onClick={CartStatus}
          >
            <div>
              <span className={style.IconCartContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="rgb(130, 220, 147)"
                  height="15"
                  width="15"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                    clipRule="evenodd"
                  />
                </svg>

                {amount > 0 ? (
                  <div className={style.cartIndicator}>
                    {amount > 0 ? <p>{amount}</p> : null}
                  </div>
                ) : null}
              </span>
            </div>
            <p>Ver el carrito</p>
          </motion.button>
        )}
      </AnimatePresence>

      <div className={style.buttonsContainer}>
        {viewportWidth > 500 && (
          <>
            <button className={style.button2} onClick={CartStatus}>
              <span className={style.IconCartContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="rgb(130, 220, 147)"
                  height="22"
                  width="22"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                    clipRule="evenodd"
                  />
                </svg>

                {amount > 0 ? (
                  <div className={style.cartIndicator}>
                    {amount > 0 ? <p>{amount}</p> : null}
                  </div>
                ) : null}
              </span>
            </button>

            <p> |</p>
          </>
        )}

        <div className={style.userContainer}>
          <button
            onClick={userDropdownHandler}
            className={style.userImgContainer}
          >
            {userData && (
              <img
                style={{ borderRadius: "999px" }}
                src={userData.image}
                alt="user-male-circle"
              />
            )}
            <div className={style.dropdownIndicator}>
              <motion.svg
                animate={{
                  rotate: isUserDropdownOpen == true ? 180 : 0,
                  strokeWidth: 3,
                  stroke: "rgb(130, 220, 147)",
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
                width="13"
                height="13"
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
                        window.sessionStorage.setItem("from_landing", true);

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

                      <p className={style.dropdownOptionsText}>Mi cuenta</p>
                    </button>
                    <button
                      className={style.dropdownOption}
                      onClick={() => {
                        // setExit(true);
                        // setTimeout(() => {
                        //   navigate("/store");
                        // }, 500);
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
                            d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </p>

                      <p className={style.dropdownOptionsText}>Cupones</p>
                    </button>
                    {/* <button className={style.dropdownOption} onClick={() => {}}>
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
                    </button> */}
                    <div className={style.divider}>
                      <p></p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className={`${style.menuCart} ${
          cartIsOpen == false ? style.cartOpen : style.cartClosed
        }`}
      >
        {/* --------- FOOD IN CART COMPONENT ----------------- */}
        <AnimatePresence mode="popLayout">
          {foodInCart.length !== 0 ? (
            <motion.div
              key="checkout"
              className={style.cartCheckout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ y: 0 }}
            >
              <header>
                <button
                  onClick={() => {
                    dispatch(cartStatus(false));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    width="20"
                    height="20"
                    style={{ rotate: viewportWidth < 500 && "90deg" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
                <p>Checkout</p>
              </header>
              <div className={style.foodCheckout}>
                <div className={style.foodContent}>
                  <AnimatePresence mode="popLayout">
                    {foodInCart?.map(
                      ({
                        id,
                        title,
                        image,
                        price,
                        discount,
                        quantity,
                        total,
                      }) => (
                        <motion.div
                          key={id}
                          layout
                          initial={{ opacity: 0, scale: 0 }}
                          exit={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 200,
                          }}
                          className={style.dataContainer}
                        >
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
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
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
            <motion.div
              key="checkoutPlaceholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ y: 0 }}
              className={style.checkoutPlaceholder}
            >
              <div className={style.placeholderContainer}>
                <div className={style.imgContainer}>
                  <img
                    className={style.imgCheckoutPlaceholder}
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/q_40/v1729184547/Projects%20Images/Indico/Store%20image%20backgrounds_utils/Empty%20shopping%20cart.webp"
                    alt=""
                  />
                </div>
                <p>El carrito está vacío</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Sidebars;
