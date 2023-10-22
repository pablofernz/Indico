import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import ClientLogin from "./Views/Client/Login/Login";
import ClientRegister from "./Views/Client/Register/Register";
import Store from "./Views/Store/Store";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/landing"} />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/store" element={<Store/>} />

      </Routes>
    </div>
  );
}

export default App;
