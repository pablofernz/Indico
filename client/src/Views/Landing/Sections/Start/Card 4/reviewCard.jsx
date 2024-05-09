import style from "./reviewCard.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ReviewCard = () => {
  const reviews = useSelector((state) => state.reviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  const test = reviews[0];


  const generateStars = (stars) => {
    const starIcons = [];
    for (let i = 0; i < stars; i++) {
      starIcons.push(
        <svg
          key={i}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.810l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.810h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    return starIcons;
  };

  return (
    <div>
      <div className={style.card}>
        <div className={style.header}>
          {/* Verificar si test.image está definido antes de acceder a la propiedad */}
          {test.image && (
            <img src={test.image} alt="xd" className={style.image} />
          )}
          <div>
            <p className={style.name}>
              {/* Verificar si test.name y test.lastname están definidos antes de acceder a las propiedades */}
              {test.name &&
                test.lastname &&
                `${test.name} ${test.lastname}`}
            </p>
            <div className={style.stars}>
              {/* Verificar si test.reviews[0] y test.reviews[0].stars están definidos antes de acceder a las propiedades */}
              {test.reviews[0] &&
                test.reviews[0].stars &&
                generateStars(test.reviews[0].stars)}
            </div>
          </div>
        </div>

        {/* Verificar si test.reviews[0] y test.reviews[0].text están definidos antes de acceder a las propiedades */}
        {test.reviews[0] && test.reviews[0].text && (
          <p className={style.message}>"{test.reviews[0].text}"</p>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;