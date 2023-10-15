import style from "./Login.module.css";
import { useState } from "react";
import axios from "axios";

const ClientLogin = () => {
  const [Loading, isLoading] = useState(false);
  const [form, setForm] = useState([
    {
      email: "",
      password: "",
    },
  ]);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    //cuando se hace click realiza el post
    event.preventDefault();

    axios
      .post("http://localhost:3001/client/login", form)
      .then((res) => alert(res.data))
      .catch((err) => alert(err.response.data));
  };

  return (
    <header className={style.form}>
      <div className={style.background}></div>
      <div className={style.loginContainer}>
        <form className={style.login}>
          <h1 className={style.title}>Inicia Sesión</h1>
          <label className={style.label}>Email</label>
          <div className={style.inputForm}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="rgb(90, 90, 90)"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            <input
              type="text"
              className={style.input}
              placeholder="email@example.com"
              onChange={changeHandler}
              value={form.email}
              name="email"
            />
          </div>

          <label className={style.label}>Contraseña</label>
          <div className={style.inputForm}>
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
            <input
              type="password"
              className={style.input}
              placeholder="Ingresa tu contraseña"
              onChange={changeHandler}
              value={form.password}
              name="password"
            />
          </div>

          <div className={style.flexRow}></div>
          <button className={style.buttonSubmit} onClick={submitHandler}>
            {Loading == false ? "Inicia Sesión" : "Cargando..."}
          </button>
          <p className={style.p}>
            No tienes una cuenta?{" "}
            <a
              className={style.span}
              onClick={() => navigate("/client/register")}
            >
              Registrate
            </a>
          </p>
          <p className={style.p}>O ingresa con</p>

          <div className={style.flexRow}>
            <button className={style.btn}>
              <svg x="0px" y="0px" width="30" height="40" viewBox="0,0,256,256">
                <g fillOpacity="0" fill="#1e1e1e">
                  <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
                </g>
                <g fill="#1a1a1a">
                  <g transform="scale(5.33333,5.33333)">
                    <path d="M23,21.5v5c0,0.828 0.671,1.5 1.5,1.5h10.809c-0.499,1.416 -1.256,2.698 -2.205,3.805l6.033,5.229c3.022,-3.505 4.863,-8.054 4.863,-13.034c0,-0.828 -0.064,-1.688 -0.202,-2.702c-0.101,-0.743 -0.736,-1.298 -1.486,-1.298h-17.812c-0.829,0 -1.5,0.672 -1.5,1.5zM12.612,27.761c-0.392,-1.184 -0.612,-2.447 -0.612,-3.761c0,-1.314 0.22,-2.577 0.612,-3.761l-6.557,-5.014c-1.303,2.653 -2.055,5.624 -2.055,8.775c0,3.151 0.752,6.122 2.056,8.775zM30.865,33.835c-1.959,1.369 -4.333,2.165 -6.865,2.165c-4.212,0 -7.917,-2.186 -10.059,-5.478l-6.362,4.865c3.616,5.198 9.623,8.613 16.421,8.613c4.968,0 9.508,-1.832 13.009,-4.84zM37.515,9.297c-3.702,-3.416 -8.502,-5.297 -13.515,-5.297c-6.798,0 -12.805,3.415 -16.421,8.614l6.362,4.865c2.142,-3.293 5.847,-5.479 10.059,-5.479c2.944,0 5.776,1.081 7.974,3.043c0.593,0.53 1.498,0.504 2.06,-0.059l3.525,-3.524c0.289,-0.288 0.447,-0.683 0.439,-1.091c-0.008,-0.408 -0.183,-0.795 -0.483,-1.072z"></path>
                  </g>
                </g>
              </svg>
              Google
            </button>

            <button className={style.btn}>
              <svg
                viewBox="0 0 24 24"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              GitHub
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default ClientLogin;
