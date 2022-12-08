import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import styles from "./Instagram.module.scss";
import instagramData from "../../../assets/data/instagramData";
import AspectRatio from "../../AspectRatio";
import CustomSwiper from "../../CustomSwiper";
import { IconInstagram } from "../../../assets/icons/icons";

function Instagram() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={`section-title ${styles.title}`}>Happy Meal SNS</h2>
        <a href="https://www.instagram.com/" className={styles.link}>
          <IconInstagram />
          happymeal_official
        </a>
        <CustomSwiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={"auto"}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          buttonSize="sm"
          breakpoints={{
            576: {
              spaceBetween: 20,
            },
          }}
        >
          {instagramData.map((data) => (
            <SwiperSlide key={data.id} style={{ width: "fit-content" }}>
              <div className={styles.imageWrapper}>
                <AspectRatio ratio={1}>
                  <img src={data.imageUrl} alt="" className={styles.image} />
                </AspectRatio>
              </div>
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
    </section>
  );
}

export default Instagram;
