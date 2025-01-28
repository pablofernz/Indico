import style from "./Register.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import IconLoader from "../../../Components/iconLoader/iconLoader";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validate from "./validations";
import Cookies from "js-cookie";
import SwipeMiddleTop from "../../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import SwipeTopMiddle from "../../../Components/pageAnimations/swipeUp/Start/swipeUp";
import { useDispatch } from "react-redux";
import { setNetworkConnectionError } from "../../../Redux/actions";
import useViewportWidth from "../../../Hooks/useViewportWidth";
import googleAuth from "../../../auth/googleAuth";

const ClientRegister = () => {
  const navigate = useNavigate();
  const [Loading, isLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isExit, setExit] = useState(false);
  const dispatch = useDispatch();
  const viewportWidth = useViewportWidth();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    image: "",
  });

  const [submitErrors, setSubmitErrors] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setErrors({ ...errors, [property]: "" });
  };

  useEffect(() => {
    if (showErrorToast) {
      toast.error(submitErrors, {
        duration: 4000,
        position: viewportWidth > 600 ? "top-center" : "bottom-right",
        style: {
          background: "rgb(23,23,23)",
          color: "#fff",
        },
      });
      setShowErrorToast(false);
    }

    if (isRegistered) {
      toast.success("Ingresando...", {
        duration: 4000,
        position: viewportWidth > 600 ? "top-center" : "bottom-right",
        style: {
          background: "rgb(23,23,23)",
          color: "#fff",
        },
      });
      setTimeout(() => {
        setExit(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }, 1000);
    }
  }, [isRegistered, submitErrors, showErrorToast]);

  const submitHandler = async (event) => {
    event.preventDefault();
    isLoading(true);
    setSubmitErrors("");
    setIsRegistered(false);

    const property = event.target.name;
    const value = event.target.value;

    const validationErrors = validate({ ...form, [property]: value });

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post(
          "https://indico-backend.onrender.com/client/access/register",
          // "http://localhost:3001/client/access/register",
          form
        );
        if (res) {
          console.log(res);
          Cookies.set("session_token", res.data.token);
          isLoading(false);
          setIsRegistered(true);
        } else {
          dispatch(setNetworkConnectionError());
        }
      } catch (err) {
        console.log(err);
        dispatch(setNetworkConnectionError());
        isLoading(false);
        setSubmitErrors(err.response.data);
        setShowErrorToast(true);
      }
    } else {
      setErrors(validationErrors);
      setSubmitErrors("Revise los datos");
      setIsRegistered(false);
      isLoading(false);
      setShowErrorToast(true);
    }
  };

  useEffect(() => {
    (Cookies.get("session_token") || window.localStorage.getItem("userData")) &&
      navigate("/account");
  }, []);

  const backHandler = () => {
    setExit(true);
    setTimeout(() => {
      if (window.sessionStorage.getItem("page_aux")) {
        navigate(window.sessionStorage.getItem("page_aux"));
        // window.sessionStorage.removeItem("page_aux");
      } else {
        window.history.back();
      }
    }, 500);
  };

  const thirdPartyAccess = async () => {
    try {
      const userData = await googleAuth();
      const userDataFiltered = {
        auth: {
          authMethod: "google",
          uid: userData.uid,
        },
        email: userData.email,
        image: userData.photoURL,
        name: userData.displayName.split(" ")[0],
        lastname: userData.displayName.split(" ")[1],
      };

      isLoading(true);
      setIsRegistered(false);

      const res = await axios.post(
        "https://indico-backend.onrender.com/client/access/thirdparty",
        // "http://localhost:3001/client/access/thirdparty",
        userDataFiltered
      );
      if (res.status === 200) {
        console.log(res);
        Cookies.set("session_token", res.data.token);
        isLoading(false);
        setIsRegistered(true);
      }
    } catch (error) {
      console.log(error);
      setIsRegistered(false);
      isLoading(false);
      setShowErrorToast(true);
    }
  };
  return (
    <div className={style.registerPage}>
      {useViewportWidth() > 700 && (
        <button className={style.backButton} onClick={backHandler}>
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
      )}
      <SwipeMiddleTop />
      {isExit == true && <SwipeTopMiddle />}
      <header className={style.form}>
        <div className={style.background}></div>
        <div className={style.loginContainer}>
          <form className={style.login}>
            {useViewportWidth() < 700 && (
              <button className={style.backButtonSmall} onClick={backHandler}>
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
            )}
            <Toaster />
            <h1 className={style.title}>Registrate</h1>

            <div className={style.dataContainer}>
              <label className={style.label}>Nombres</label>
              <div
                className={
                  !errors.name ? style.inputForm : style.inputFormError
                }
              >
                <input
                  type="text"
                  className={!errors.name ? style.input : style.inputError}
                  placeholder={errors.name ? errors.name : "Nombre"}
                  onChange={changeHandler}
                  value={form.name}
                  name="name"
                  id="name"
                  autoComplete="name"
                />
                {errors.name ? (
                  <div className={style.svg}>
                    <svg
                      className="feather feather-alert-circle"
                      fill="none"
                      height="20"
                      stroke="rgb(255, 137, 137)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>

            <div className={style.dataContainer}>
              <label className={style.label}>Apellido</label>
              <div
                className={
                  !errors.lastname ? style.inputForm : style.inputFormError
                }
              >
                <input
                  type="text"
                  className={!errors.lastname ? style.input : style.inputError}
                  placeholder={errors.lastname ? errors.lastname : "Apellido"}
                  onChange={changeHandler}
                  value={form.lastname}
                  name="lastname"
                  id="lastname"
                />
                {errors.lastname ? (
                  <div className={style.svg}>
                    <svg
                      className="feather feather-alert-circle"
                      fill="none"
                      height="20"
                      stroke="rgb(255, 137, 137)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>

            <div className={style.dataContainer}>
              <label className={style.label}>Email</label>
              <div
                className={
                  !errors.email ? style.inputForm : style.inputFormError
                }
              >
                <input
                  type="email"
                  className={!errors.email ? style.input : style.inputError}
                  placeholder={
                    errors.email ? errors.email : "Ingresa un correo"
                  }
                  onChange={changeHandler}
                  value={form.email}
                  name="email"
                  id="email"
                  autoComplete="email"
                />
                {errors.email ? (
                  <div className={style.svg}>
                    <svg
                      className="feather feather-alert-circle"
                      fill="none"
                      height="20"
                      stroke="rgb(255, 137, 137)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <div className={style.svgCard}>{errors.email}</div>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="rgb(90, 90, 90)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                )}
              </div>
            </div>

            <div className={style.dataContainer}>
              <label className={style.label}>Contraseña</label>
              <div
                className={
                  !errors.password ? style.inputForm : style.inputFormError
                }
              >
                <input
                  type={showPassword == false ? "password" : "text"}
                  className={!errors.password ? style.input : style.inputError}
                  placeholder={
                    errors.password ? errors.password : "Ingrese una contraseña"
                  }
                  onChange={changeHandler}
                  value={form.password}
                  name="password"
                  id="password"
                />
                {errors.password ? (
                  <div className={style.svg}>
                    <svg
                      className="feather feather-alert-circle"
                      fill="none"
                      height="20"
                      stroke="rgb(255, 137, 137)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <div className={style.svgCard}>{errors.password}</div>
                  </div>
                ) : (
                  <svg
                    fill="rgb(90, 90, 90)"
                    height="20"
                    viewBox="-64 0 512 512"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                  </svg>
                )}
                <button
                  className={style.eye}
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword == false ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      height="20"
                      width="20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      height="20"
                      width="20"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={style.flexRow}></div>
            <button
              className={
                Loading == true ? style.buttonSubmitLoading : style.buttonSubmit
              }
              onClick={submitHandler}
            >
              {Loading == true ? <IconLoader /> : "Crear cuenta"}
            </button>
            <p className={style.p}>
              Ya tienes una cuenta?{" "}
              <a
                className={style.span}
                onClick={() => {
                  setExit(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 500);
                }}
              >
                Inicia Sesión
              </a>
            </p>
            <div className={style.flexRow}>
              <button
                className={style.btn}
                onClick={thirdPartyAccess}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 48 48"
                  className={style.btnSvg}
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                Conexión con Google
              </button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default ClientRegister;
