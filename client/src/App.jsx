import { React, lazy } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./Views/Landing/Landing";
const MyReviews = lazy(() =>
  import("./Views/Client/Account/MyReviews/MyReviews")
);
const ClientLogin = lazy(() => import("./Views/Client/Login/Login"));
const ClientRegister = lazy(() => import("./Views/Client/Register/Register"));
const Store = lazy(() => import("./Views/Store/Store"));
const NotFound = lazy(() => import("./Views/404 Not Found/404"));
const Pay = lazy(() => import("./Views/Store/Pay/Pay"));
const Reviews = lazy(() => import("./Views/Reviews/Reviews"));
const AccountPage = lazy(() => import("./Views/Client/Account/Account"));
const PersonalData = lazy(() =>
  import("./Views/Client/Account/PersonalData/PersonalData")
);
const MyPurchases = lazy(() =>
  import("./Views/Client/Account/MyPurchases/MyPurchases")
);
const Favorites = lazy(() =>
  import("./Views/Client/Account/Favorites/Favorites")
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/store/reviews" element={<Reviews />} />

        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />

        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/myinformation" element={<PersonalData />} />
        <Route path="/account/purchases" element={<MyPurchases />} />
        <Route path="/account/favorites" element={<Favorites />} />
        <Route path="/account/reviews" element={<MyReviews />} />

        <Route path="/store" element={<Store />} />
        <Route path="/store/pay" element={<Pay />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
