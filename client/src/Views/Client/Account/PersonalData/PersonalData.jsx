import style from "./PersonalData.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import SwipeMiddleTop from "../../../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import { AnimatePresence, motion } from "framer-motion";
import validate from "./validations";
import toast, { Toaster } from "react-hot-toast";
import SwipeBottomMiddle from "../../../../Components/pageAnimations/swipeUp/Exit/swipeUp";

const PersonalData = () => {
  const navigate = useNavigate();

  const [isExit, setExit] = useState(false);
  const [goLanding, setGoLanding] = useState(false);
  const [editorMode, setEditorMode] = useState(false);
  const [updatedData, setUpdatedData] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [passwordEditor, setPasswordEditor] = useState(false);
  const [seeActualPassword, setSeeActualPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);

  const [userData, setUserData] = useState(
    JSON.parse(window.sessionStorage.getItem("userData"))
  );
  const token = Cookies.get("session_token");

  const [newData, setNewData] = useState({
    name: userData.name,
    lastname: userData.lastname,
    image: userData.image,
    newPassword: "",
    actualPassword: "",
    email: userData.email,
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    image: "",
    newPassword: "",
    actualPassword: "",
    email: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setNewData({ ...newData, [property]: value });
    setErrors({ ...errors, [property]: "" });
  };

  const submitHandler = async () => {
    const validationErrors = await validate(userData, newData, passwordEditor);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado de autorización
            "Content-Type": "application/json", // Establece el tipo de contenido como JSON
          },
        };

        const response = await axios.put(
          `http://localhost:3001/client/update/${userData.id}`,
          newData,
          config
        );

        setUpdatedData(true);
      } catch (error) {
        // console.error("Error al actualizar:", error);

        if (error.response.data === "No se realizaron cambios") {
          toast("No se realizaron cambios", {
            icon: "⚠️",
            duration: 1500,
            position: "top-center",
            style: {
              zIndex: "100000000000",
              background: "rgb(23,23,23)",
              color: "#fff",
            },
          });
        }
      }
    } else {
      // Maneja los errores de validación aquí
      console.log("Errores de validación:", validationErrors);
    }
  };

  useEffect(() => {}, []);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewData({ ...newData, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (updatedData == true) {
      toast.success("Datos actualizados", {
        duration: 1000,
        position: "top-center",
        style: {
          background: "rgb(23,23,23)",
          color: "#fff",
        },
      });
      setTimeout(() => {
        setExit(true);
        setTimeout(() => {
          navigate("/account");
        }, 1000);
      }, 1000);
    }
  }, [updatedData]);

  const deleteAccount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado de autorización
          "Content-Type": "application/json", // Establece el tipo de contenido como JSON
        },
      };

      const response = await axios.delete(
        `http://localhost:3001/client/delete/${userData.id}`,
        config
      );

      if (response) {
        if (response.data === "Usuario eliminado") {
          toast.success("Cuenta eliminada", {
            duration: 1000,
            position: "top-center",
            style: {
              zIndex: "100000000000",
              background: "rgb(23,23,23)",
              color: "#fff",
            },
          });
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form className={style.accountComponent}>
      <div className={style.background} />
      {goLanding === true && <SwipeBottomMiddle />}
      <Toaster />

      {/* - - - - - - - - - - - - - DELETE MODAL - - - - - - - - - - - - - - - - - -  */}

      <AnimatePresence>
        {deleteModal == true && (
          <motion.div
            className={style.deleteOpenModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteModal === true && (
          <motion.div
            className={style.deleteOpenModal2}
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            exit={{ y: 1000 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <Toaster />

            <div className={style.deleteContainer}>
              <div className={style.deleteModalContent}>
                <div className={style.imgDeleteContainer}>
                  <img
                    className={style.imgDelete}
                    src="https://i.ibb.co/6vTVpGd/Warning-cuate.png"
                    alt="DeleteAccountImage"
                  />
                </div>
                <div className={style.deleteTextContainer}>
                  <h4 className={style.deleteText}>
                    ¿Quieres eliminar tu cuenta?
                    <p
                      style={{
                        fontWeight: "900",
                        color: "rgb(0, 0, 0)",
                      }}
                    >
                      Perderás tus datos para siempre.
                    </p>
                  </h4>
                </div>
                <div className={style.deleteButtonContainer}>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    className={style.secundaryButton}
                    onClick={() => {
                      deleteAccount();
                      setTimeout(() => {
                        setGoLanding(true);
                        setTimeout(() => {
                          navigate("/");
                          Cookies.remove("session_token");
                          window.sessionStorage.clear();
                          window.localStorage.clear();
                        }, 500);
                      }, 500);
                    }}
                  >
                    Sí, eliminar
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    className={style.primaryButton}
                    onClick={() => {
                      setDeleteModal(false);
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
            {editorMode === false && (
              <div>
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
                <button
                  type="button"
                  style={{ left: "500px" }}
                  className={style.editButton}
                  onClick={() => {
                    setEditorMode(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="black"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                </button>
              </div>
            )}
            {editorMode === true && (
              <div>
                <button
                  type="button"
                  className={style.back}
                  onClick={() => {
                    setEditorMode(false);
                    setPasswordEditor(false);
                    setNewData({
                      name: userData.name,
                      lastname: userData.lastname,
                      image: userData.image,
                      newPassword: "",
                      actualPassword: "",
                      email: userData.email,
                    });

                    setErrors({
                      name: "",
                      lastname: "",
                      image: "",
                      newPassword: "",
                      actualPassword: "",
                      email: "",
                    });
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
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={style.editButton}
                  onClick={submitHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    width="35"
                    height="35"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            )}
            {/* - - - - - - - - - - - - - HEADER - - - - - - - - - - - - - - - - - -  */}

            <header className={style.photoSection}>
              <div className={style.headerContent}>
                <picture className={style.photoContainer}>
                  <AnimatePresence>
                    {editorMode === true && (
                      <motion.button
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        exit={{ opacity: 0 }}
                        className={style.changePhotoIconContainer}
                      >
                        <input
                          type="file"
                          id="fileInput"
                          accept="image/*"
                          onChange={handleFileChange}
                          className={style.changePhotoIconInput}
                        ></input>
                        <p className={style.changePhotoIcon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="black"
                            width="20"
                            height="20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </p>
                      </motion.button>
                    )}
                  </AnimatePresence>
                  {userData ? (
                    <img
                      src={!newData.image ? userData.image : newData.image}
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

            {/* - - - - - - - - - - - - - USERDATA - - - - - - - - - - - - - - - - - -  */}
            <main className={style.userDataContainer}>
              <div className={style.contentBox}>
                <div className={style.nameLastnameBox}>
                  <div className={style.box}>
                    <div className={style.label}>Nombre</div>
                    <div className={style.inputContainer}>
                      {editorMode === true ? (
                        <input
                          type="text"
                          id="name"
                          name="name"
                          onChange={changeHandler}
                          placeholder={errors.name}
                          value={errors.name ? "" : newData.name}
                          className={`${style.input} ${
                            errors.name && style.failed
                          }`}
                        />
                      ) : (
                        <div className={style.viewInput}>
                          <p className={style.viewInputText}>{userData.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.box}>
                    <div className={style.label}>Apellido</div>
                    <div className={style.inputContainer}>
                      {editorMode === true ? (
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          onChange={changeHandler}
                          placeholder={errors.lastname}
                          value={errors.lastname ? "" : newData.lastname}
                          className={`${style.input} ${
                            errors.lastname && style.failed
                          }`}
                        />
                      ) : (
                        <div className={style.viewInput}>
                          <p className={style.viewInputText}>
                            {userData.lastname}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={style.emailBox}>
                  <div className={style.box2}>
                    <div className={style.label}>Correo electrónico</div>
                    <div className={style.inputContainer}>
                      {editorMode === true ? (
                        <input
                          type="text"
                          id="email"
                          name="email"
                          onChange={changeHandler}
                          placeholder={errors.email}
                          value={errors.email ? "" : newData.email}
                          className={`${style.input} ${
                            errors.email && style.failed
                          }`}
                        />
                      ) : (
                        <div className={style.viewInput}>
                          <p className={style.viewInputText}>
                            {userData.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* - - - - - - - - PASSWORD - - - - - - - - - -  */}
                {passwordEditor === true && (
                  <div className={style.passwordBox}>
                    <div className={style.box}>
                      <div className={style.label}>Contraseña actual</div>
                      <div className={style.inputContainer}>
                        <input
                          autoComplete="off"
                          type={
                            seeActualPassword === true ? "text" : "password"
                          }
                          id="actualPassword"
                          name="actualPassword"
                          onChange={changeHandler}
                          placeholder={errors.actualPassword}
                          value={
                            errors.actualPassword ? "" : newData.actualPassword
                          }
                          // value={newData.actualPassword}
                          className={`${style.passwordInput} ${
                            errors.actualPassword && style.failed
                          }`}
                        />
                        {newData.actualPassword && (
                          <button
                            type="button"
                            className={style.seePasswordButton}
                            onClick={() => {
                              setSeeActualPassword(!seeActualPassword);
                            }}
                          >
                            {seeActualPassword === false ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgb(130, 130, 130)"
                                width="20"
                                height="20"
                              >
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgb(130, 130, 130)"
                                width="20"
                                height="20"
                              >
                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className={style.box}>
                      <div className={style.label}>Contraseña nueva</div>
                      <div className={style.inputContainer}>
                        <input
                          type={seeNewPassword === true ? "text" : "password"}
                          autoComplete="off"
                          id="newPassword"
                          name="newPassword"
                          onChange={changeHandler}
                          placeholder={errors.newPassword}
                          value={errors.newPassword ? "" : newData.newPassword}
                          // value={newData.newPassword}
                          className={`${style.passwordInput} ${
                            errors.newPassword && style.failed
                          }`}
                        />
                        {newData.newPassword && (
                          <button
                            type="button"
                            className={style.seePasswordButton}
                            onClick={() => {
                              setSeeNewPassword(!seeNewPassword);
                            }}
                          >
                            {seeNewPassword === false ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgb(130, 130, 130)"
                                width="20"
                                height="20"
                              >
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgb(130, 130, 130)"
                                width="20"
                                height="20"
                              >
                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* - - - - - - - - - - - - - FOOTER - - - - - - - - - - - - - - - - - -  */}

                {passwordEditor === false && (
                  <div className={style.passwordBox}>
                    <div className={style.changePassword}>
                      <button
                        className={style.changePasswordButton}
                        type="button"
                        onClick={() => {
                          setEditorMode(true);
                          setPasswordEditor(true);
                        }}
                      >
                        Cambiar contraseña
                      </button>
                      <div className={style.changePasswordInputs}></div>
                    </div>
                  </div>
                )}
                <div className={style.otherButtonsBox}>
                  <div className={style.buttonsContainer}>
                    <AnimatePresence>
                      {editorMode === false && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={style.deleteButton}
                          type="button"
                          onClick={() => {
                            setDeleteModal(true);
                          }}
                        >
                          Eliminar cuenta
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </form>
  );
};
export default PersonalData;
