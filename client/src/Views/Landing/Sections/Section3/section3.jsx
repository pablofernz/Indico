import style from "./section3.module.css";
import Card from "../../../../Components/MenuCards/Card/Card";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section3 = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const dishes = useSelector((state) => state.menu);

  const [pixels, setPixels] = useState(-0.1);

  const indexIncrease = () => {
    if (carouselIndex === 0) {
      setCarouselIndex(1);
      setPixels(-600);
    }
    if (carouselIndex === 1) {
      setCarouselIndex(2);
      setPixels(-1200);
    }
  };

  const indexDecrease = () => {
    if (carouselIndex === 2) {
      setCarouselIndex(1);
      setPixels(-600);
    }
    if (carouselIndex === 1) {
      setCarouselIndex(0);
      setPixels(-0.1);
    }
  };
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  const color = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)"]
  );
  return (
    <div className={style.section3}>
      <div className={style.headerTextContainer}>
        <motion.h1
          className={style.headerText}
          ref={ref}
          style={{ color: color }}
        >
          Algunas de nuestras opciones son
        </motion.h1>
      </div>

      <div className={style.footerContainer}>
        <button onClick={indexDecrease}> -</button>
        <div className={style.carouselComponent}>
          {dishes.length ? (
            <motion.div
              animate={{
                x: `${pixels}px`,
              }}
              transition={{
                duration: 1.5,
                ease: "ease",
                type: "spring",
              }}
              className={style.carouselContainer}
            >
              <Card
                id={dishes[3]._id}
                title={dishes[3].title}
                description={dishes[3].description}
                image={dishes[3].image}
                discount={dishes[3].discount}
                price={dishes[3].price}
              />
              <Card
                id={dishes[19]._id}
                title={dishes[19].title}
                description={dishes[19].description}
                image={dishes[19].image}
                discount={dishes[19].discount}
                price={dishes[19].price}
              />
              <Card
                id={dishes[0]._id}
                title={dishes[0].title}
                description={dishes[0].description}
                image={dishes[0].image}
                discount={dishes[0].discount}
                price={dishes[0].price}
              />

              <Card
                id={dishes[7]._id}
                title={dishes[7].title}
                description={dishes[7].description}
                image={dishes[7].image}
                discount={dishes[7].discount}
                price={dishes[7].price}
              />

              <Card />
            </motion.div>
          ) : null}
        </div>
        <button onClick={indexIncrease}> +</button>
      </div>
    </div>
  );
};

export default Section3;
