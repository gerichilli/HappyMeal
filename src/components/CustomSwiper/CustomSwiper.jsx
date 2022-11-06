import { useState } from "react";
import { Swiper } from "swiper/react";
import styles from "./CustomSwiper.module.scss";
import createClassName from "../../utils/createClassName";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function CustomSwiper({ children, buttonSize, ...props }) {
  const [swiperRef, setSwiperRef] = useState(null);

  function handleSlideNext() {
    swiperRef.slideNext();
  }

  function handleSlidePrev() {
    swiperRef.slidePrev();
  }

  return (
    <div className={styles.container}>
      <Swiper {...props} onSwiper={(swiper) => setSwiperRef(swiper)}>
        {children}
      </Swiper>
      <button
        onClick={handleSlidePrev}
        className={createClassName(styles.btn, styles.btnPrev, styles[`btn--${buttonSize}`])}
        aria-label="Previous slide"
      >
        <GrFormPrevious />
      </button>
      <button
        onClick={handleSlideNext}
        className={createClassName(styles.btn, styles.btnNext, styles[`btn--${buttonSize}`])}
        aria-label="Next slide"
      >
        <GrFormNext />
      </button>
    </div>
  );
}

export default CustomSwiper;
