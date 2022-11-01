import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import bannerData from "../../../assets/data/bannerData";
import styles from "./Banner.module.scss";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      className="mySwiper"
    >
      {bannerData.map((data) => (
        <SwiperSlide key={data.id}>
          <div
            className={styles.banner}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url(${data.image})`,
            }}
          >
            <div className="container">
              <div className={styles.bannerContainer}>
                <div className={styles.subtitle}>{data.subtitle}</div>
                <h2 className={styles.title}>{data.title}</h2>
                <div className={styles.description}>{data.description}</div>
                <Link to={`/recipe/${data.id}`} className={styles.btn}>
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
