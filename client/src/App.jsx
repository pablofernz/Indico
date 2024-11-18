import { React, lazy, useEffect, useState } from "react";
import style from "./App.module.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Landing from "./Views/Landing/Landing";
import { useSelector } from "react-redux";
import CookiesPopup from "./Views/Popups/Cookies popup/cookiesPopup";
import SlowNetworkPopup from "./Views/Popups/Slow Network popup/slowNetworkPopup";
import { setSlowNetworkPopup } from "./Redux/actions";
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
  const networkError = useSelector((state) => state.errors.network_connection);
  const slowNetwork = useSelector((state) => state.popups.slowNetwork);

  useEffect(() => {
    if (networkError) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [networkError]);

  useEffect(() => {
    console.log(slowNetwork);
  }, [slowNetwork]);
  return (
    <div className="App">
      <AnimatePresence mode="popLayout">
        {networkError === true ? (
          <motion.div className={style.errorBackground}>
            <div className={style.reviewContainer}>
              <div className={style.reviewModalContent}>
                <div className={style.imgReviewContainer}>
                  <img
                    className={style.imgReview}
                    src="https://res.cloudinary.com/dnrprmypf/image/upload/q_10/v1730479229/Projects%20Images/Indico/Store%20image%20backgrounds_utils/Maintenance-bro_xjdfa6.webp"
                    alt="LogoutImage"
                  />
                </div>
                <p className={style.primaryText}>
                  La página está fuera de servicio por mantenimiento.
                </p>
                <p className={style.secondaryText}>
                  Pronto volverá todo a la normalidad
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
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
          </>
        )}

        <div className={style.popupsContainer}>
          <AnimatePresence mode="popLayout">
            {slowNetwork === true && (
              <>
                <SlowNetworkPopup />
              </>
            )}
          </AnimatePresence>
        </div>
      </AnimatePresence>
    </div>
  );
}

export default App;
