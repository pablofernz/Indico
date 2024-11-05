import style from "./reviewForm.module.css";
import ReactDOM from "react-dom";
import { AnimatePresence, motion, spring } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import IconLoader from "../../../Components/iconLoader/iconLoader";

const CreateReviewForm = ({ setReviewFormOpen, setUpdateSignal }) => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  const [form, setForm] = useState({
    stars: 0,
    text: "",
  });
  const [tooltipViewed, setTooltipViewed] = useState(0);
  const [sendingReviewStatus, setSendingReviewStatus] = useState("notSend");

  const reviewFormHandler = (event) => {
    setForm({
      ...form,
      text:
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).replace(/^\s+/, "").replace(/\s\s+/g, " "),
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setReviewFormOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const tooltips = ["Pésimo", "Malo", "Neutral", "Bueno", "Excelente"];

  const renderItems = [];
  for (let i = 0; i < 5; i++) {
    renderItems.push(
      <div className={style.starsAndTooltipContainer}>
        <button
          type="button"
          key={i}
          onClick={() => {
            setForm({ ...form, stars: i + 1 });
          }}
          onMouseEnter={() => {
            setTooltipViewed(i + 1);
          }}
          onMouseLeave={() => {
            setTooltipViewed(0);
          }}
          className={style.setStarsButton}
        >
          <motion.svg
            animate={{
              fill:
                form.stars >= i + 1
                  ? "rgb(141, 214, 146)"
                  : "rgb(225, 225, 225)",
            }}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </motion.svg>
        </button>
        <AnimatePresence mode="popLayout">
          {tooltipViewed > 0 && tooltipViewed === i + 1 && (
            <motion.p
              layout
              key={i + 1}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layoutId="tooltip"
              className={style.tooltip}
            >
              {tooltips[tooltipViewed - 1]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const submitHandler = async () => {
    try {
      setSendingReviewStatus("sending");

      const response = await axios.post(
        `https://indico-backend.onrender.com/client/${userData.id}/review/add`,
        form
      );
      setSendingReviewStatus("sent");
      setTimeout(() => {
        setReviewFormOpen(false)
        setUpdateSignal(true)
        setTimeout(() => {
          setUpdateSignal(false)
        }, 500);;
      }, 3000);
    } catch (error) {
      console.log(error);
      setSendingReviewStatus("error");
      setTimeout(() => {
        setSendingReviewStatus("notSend");
      }, 3000);
    }
  };
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={style.background}
    >
      <motion.div
        initial={{ y: "150dvh" }}
        exit={{ y: "150dvh" }}
        animate={{ y: "0dvh" }}
        transition={{
          type: "spring",
          stiffness: 100, // Aumenta la rigidez para una respuesta más rápida
          damping: 15, // Controla el rebote
        }}
        className={style.card}
      >
        <AnimatePresence mode="popLayout">
          <motion.form
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={style.cardAux}
          >
            <header>
              <p>
                <label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                Escribir una reseña
              </p>
              <button
                type="button"
                onClick={() => {
                  setReviewFormOpen(false);
                }}
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>
            <footer>
              <div className={style.starsContainer}>
                <div className={style.starstextContainer}>
                  <h1>¿Te gustó nuestro servicio?</h1>
                  <p>
                    Tu opinión es muy importante para nosotros. Cuéntanos cómo
                    calificarías nuestro servicio.
                  </p>
                </div>

                <div className={style.starsButtons}>
                  <div style={{ display: "flex" }}>{renderItems}</div>
                </div>
              </div>
              <div className={style.textContainer}>
                <textarea
                  className={style.textArea}
                  name="text"
                  autoComplete="off"
                  value={form.text}
                  minLength="10"
                  maxLength="200"
                  spellCheck="false"
                  placeholder="Añade un comentario..."
                  onChange={reviewFormHandler}
                />
                {form.text.length < 10 ? (
                  <p className={style.charCounter}>
                    Escribe {10 - form.text.length}{" "}
                    {10 - form.text.length === 1 ? "letra" : "letras"} más
                  </p>
                ) : (
                  <p
                    className={
                      form.text.length !== 200
                        ? style.charCounter
                        : style.charCounterMax
                    }
                  >
                    {form.text.length} / 200
                  </p>
                )}
              </div>
            </footer>
            <div className={style.submitButtonContainer}>
              <button
                className={`${style.submitButton} ${
                  form.stars == 0 || form.text.length < 10
                    ? style.notSubmit
                    : sendingReviewStatus === "sending"
                    ? style.sending
                    : sendingReviewStatus === "error"
                    ? style.error
                    : sendingReviewStatus === "sent" && style.success
                }`}
                disabled={
                  sendingReviewStatus == "sending" ||
                  sendingReviewStatus == "sent" ||
                  form.stars == 0 ||
                  form.text.length < 10 ||
                  sendingReviewStatus == "error"
                }
                type="button"
                onClick={submitHandler}
              >
                <AnimatePresence mode="popLayout">
                  {sendingReviewStatus == "notSend" && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      exit={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Enviar
                    </motion.p>
                  )}
                  {sendingReviewStatus == "sent" && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      exit={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Gracias por tus comentarios!
                    </motion.p>
                  )}

                  {sendingReviewStatus == "sending" && (
                    <IconLoader color="whitesmoke" scale="1" />
                  )}

                  {sendingReviewStatus == "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      exit={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      No puedes tener 2 reseñas iguales
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.getElementById("modal")
  );
};

export default CreateReviewForm;
