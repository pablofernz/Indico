import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import ClientLogin from "./Views/Client/Login/Login";
import ClientRegister from "./Views/Client/Register/Register";
import Store from "./Views/Store/Store";
import NotFound from "./Views/404 Not Found/404";
import Pay from "./Views/Store/Pay/Pay";
import Reviews from "./Views/Reviews/Reviews";
import AccountPage from "./Views/Client/Account/Account";
import PersonalData from "./Views/Client/Account/PersonalData/PersonalData";
import MyPurchases from "./Views/Client/Account/MyPurchases/MyPurchases";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/reviews" element={<Reviews />} />

        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/myinformation" element={<PersonalData />} />
        <Route path="/account/purchases" element={<MyPurchases />} />


        <Route path="/store" element={<Store />} />
        <Route path="/store/pay" element={<Pay />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
