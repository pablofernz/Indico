import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import ClientLogin from "./Views/Client/Login/Login";
import ClientRegister from "./Views/Client/Register/Register";
import Store from "./Views/Store/Store";
import NotFound from "./Views/404 Not Found/404";
import Pay from "./Views/Store/Pay/Pay";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/landing"} />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/pay" element={<Pay />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
