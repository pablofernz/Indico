import ReviewsSection from "../ReviewCard/reviewsSection";
import style from "./reviewContainer.module.css";
import { useSelector } from "react-redux";

const ReviewContainer = () => {
  const reviews = useSelector((state) => state.reviews);
  const reviewCopy = [];

  reviews.forEach((reviews) => {
    reviews.reviews.forEach((review) => {
      const reviewCopy2 = { ...reviews };
      reviewCopy2.reviews = review;

      reviewCopy.push(reviewCopy2);
    });
  });

  return (
    <div className={style.page}>
      <h1>Lo que dicen algunos de nuestros clientes:</h1>
      <div className={style.container}>
        <div className={style.Cards}>
          {reviewCopy.map(({ name, lastname, image, reviews }) => {
            const { text, stars } = reviews;
            return (
              <ReviewsSection
                name={name}
                lastname={lastname}
                image={image}
                text={text}
                stars={stars}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ReviewContainer;
