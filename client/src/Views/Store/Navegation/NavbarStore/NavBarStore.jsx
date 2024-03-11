import React, { useState, useEffect } from "react";
import style from "./NavBarStore.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setGrid, setList } from "../../../../Redux/actions";

const NavBarStore = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const visual = useSelector((state) => state.storeView);

  const selectGrid = () => {
    dispatch(setGrid());
  };

  const selectList = () => {
    dispatch(setList());
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

  
  };
  return (
    <div>
      <nav>
        <div className={style.navbar}>
          <div className={style.menu}>
            <button
              className={`${style.button} ${
                visual === "grid" ? style.buttonChecked : style.button
              }`}
              onClick={selectGrid}
            >
              <svg
                enableBackground="new 0 0 0 0"
                height="32px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 32 32"
                width="25px"
              >
                <g>
                  <path
                    d="M15.42,7.221c0-0.951-0.771-1.721-1.721-1.721H6.729c-0.951,0-1.721,0.771-1.721,1.721v6.103   c0,0.951,0.771,1.721,1.721,1.721h6.971c0.951,0,1.721-0.771,1.721-1.721V7.221z"
                    fill="#00000"
                  />
                  <path
                    d="M27.742,7.221c0-0.951-0.77-1.721-1.721-1.721h-6.971c-0.951,0-1.721,0.771-1.721,1.721v6.103   c0,0.951,0.77,1.721,1.721,1.721h6.971c0.951,0,1.721-0.771,1.721-1.721V7.221z"
                    fill="#00000"
                  />
                  <path
                    d="M15.42,18.676c0-0.951-0.771-1.721-1.721-1.721H6.729c-0.951,0-1.721,0.77-1.721,1.721v6.104   c0,0.95,0.771,1.721,1.721,1.721h6.971c0.951,0,1.721-0.771,1.721-1.721V18.676z"
                    fill="#00000"
                  />
                  <path
                    d="M27.742,18.676c0-0.951-0.77-1.721-1.721-1.721h-6.971c-0.951,0-1.721,0.77-1.721,1.721v6.104   c0,0.95,0.77,1.721,1.721,1.721h6.971c0.951,0,1.721-0.771,1.721-1.721V18.676z"
                    fill="#00000"
                  />
                </g>
              </svg>
            </button>
            <button
              className={`${style.button} ${
                visual === "list" ? style.buttonChecked : style.button
              }`}
              onClick={selectList}
            >
              <svg
                fill="none"
                height="25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 25 25"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </button>

            <input
              value={inputValue}
              type="text"
              className={
                inputValue.length === 0 ? style.input : style.inputFocus
              }
              placeholder="Buscar"
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event);
                }
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarStore;
