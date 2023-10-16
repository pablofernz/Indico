import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import ClientLogin from "./Views/Client/Login/Login";
import Home from "./Views/Home/Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/landing"} />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
