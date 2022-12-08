import { Link } from "react-router-dom";
import styles from "./RecipesSlide.module.scss";
import { SwiperSlide } from "swiper/react";
import { HiArrowSmRight } from "react-icons/hi";
import { MAX_REVIEW_RECIPES } from "../../utils/constants";
import Recipe from "../Recipe";
import CustomSwiper from "../CustomSwiper";
import { RecipeSkeleton } from "../Skeleton";

function RecipesSlide({ title, description, recipes, recipeSize, pageLink }) {
  const slideWidth = recipeSize === "lg" ? "calc((100% - 20px * 3) / 4)" : recipeSize === "md" ? "calc((100% - 20px * 4) / 5)" : "fit-content";

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>{title}</h2>
          <Link to={pageLink} className={styles.link}>
            See more <HiArrowSmRight />
          </Link>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.sectionBody}>
          <CustomSwiper spaceBetween={20} slidesPerView={"auto"} loop={true} buttonSize={recipeSize}>
            {recipes && recipes.length > 0
              ? recipes.map((recipe) => (
                  <SwiperSlide key={recipe.id} style={{ width: slideWidth, minWidth: 200 }}>
                    <Recipe recipe={recipe} size={recipeSize} />
                  </SwiperSlide>
                ))
              : Array(MAX_REVIEW_RECIPES)
                  .fill(0)
                  .map((_, index) => (
                    <SwiperSlide key={index} style={{ width: slideWidth, minWidth: 200 }}>
                      <RecipeSkeleton />
                    </SwiperSlide>
                  ))}
          </CustomSwiper>
        </div>
      </div>
    </section>
  );
}

export default RecipesSlide;
