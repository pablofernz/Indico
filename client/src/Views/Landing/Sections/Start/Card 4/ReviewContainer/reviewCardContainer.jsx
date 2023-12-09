import ReviewCard from "../reviewCard";
import style from "./reviewCardContainer.module.css";
import { useSelector } from "react-redux";

const ReviewCardContainer = () => {
  const reviews = useSelector((state) => state.reviews);
  const reviewCopy = [];

  reviews.forEach((reviews) => {
    reviews.reviews.forEach((review) => {
      const reviewCopy2 = { ...reviews };
      reviewCopy2.reviews = review;

      reviewCopy.push(reviewCopy2);
    });
  });

  const test = reviews[0]
  console.log(test)

  return (
      <div className={style.container}>
        <div className={style.Cards}>
          {reviewCopy.map(({ name, lastname, image, reviews }) => {
            const { text, stars } = reviews;
            return (
              <ReviewCard
                name={test.name}
                lastname={test.lastname}
                image={test.image}
                text={text}
                stars={stars}
              />
            );
          })}
        </div>
      </div>
  );
};
export default ReviewCardContainer;
