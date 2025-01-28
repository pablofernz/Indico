import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu, getReviews, getDataUsers } from "../../Redux/actions";
import NavBar from "../../Components/Navbar/NavBar";
import style from "./Landing.module.css";

import SwipeMiddleTop from "../../Components/pageAnimations/swipeDown/Exit/swipeDown";
import SwipeBottomMiddle from "../../Components/pageAnimations/swipeUp/Exit/swipeUp";
import VerifyToken from "../../Verifications/Token/verifyToken";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../Client/Account/Account";
import Cookies from "js-cookie";
import HeroSection from "./Sections/HeroSection/herosection";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dishes = useSelector((state) => state.menu);
  const reviews = useSelector((state) => state.reviews);
  const usersAmount = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getMenu());
    dispatch(getDataUsers("amount"));
  }, [dispatch]);

  useEffect(() => {
    if (!Cookies.get("session_token")) {
      window.localStorage.clear();
      // window.sessionStorage.clear();
    }
  }, []);

  const ratingPoints = () => {
    let totalStars = 0;
    let numberOfReviews = 0;

    reviews.forEach((user) => {
      user.reviews.forEach((item) => {
        totalStars += item.stars;
        numberOfReviews++;
      });
    });

    return Math.floor((totalStars / numberOfReviews) * 10) / 10;
  };

  const reviewsAmount = () => {
    let numberOfReviews = 0;

    reviews.forEach((user) => {
      user.reviews.forEach((item) => {
        numberOfReviews++;
      });
    });

    return numberOfReviews;
  };

  const storeData = {
    dishesAmount: dishes.length,
    reviewsAmount: reviewsAmount(),
    averageScore: ratingPoints(),
    usersAmount: usersAmount,
  };

  const [isExit, setExit] = useState(false);

  useEffect(() => {
    Cookies.get("session_token") && getUserData();
    window.sessionStorage.setItem("page_aux", "/home");
  }, []);

  return (
    <motion.div className={style.Landing}>
      <VerifyToken />
      <SwipeMiddleTop />
      {isExit == true && <SwipeBottomMiddle />}

      <NavBar />

      <section className={style.heroSectionContainer}>
        <HeroSection
          storeData={storeData}
          setExit={setExit}
          navigate={navigate}
        />
      </section>

    </motion.div>
  );
};

export default Landing;