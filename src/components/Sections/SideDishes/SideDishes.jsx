import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SideDishes.module.scss";
import { getRandomRecipes } from "../../../services/apiServices";
import mapRecipes from "../../../utils/mapRecipes";
import { HiArrowSmRight } from "react-icons/hi";
import imageSrc from "../../../assets/images/sidedishes.jpg";
import Recipe from "../../Recipe";
import { RecipeSkeleton } from "../../Skeleton";

function SideDishes() {
  const [sideDishes, setSideDishes] = useState([]);

  useEffect(() => {
    fetchSideDishes();
  }, []);

  async function fetchSideDishes() {
    const response = await getRandomRecipes();

    if (response.status === 200) {
      let recipes = response.data.slice(0, 6);

      recipes = mapRecipes(recipes);
      setSideDishes(recipes);
    }
  }
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Random Recipes</h2>
          <Link to="/" className={styles.link}>
            See more <HiArrowSmRight />
          </Link>
          <p className={styles.description}>Regular meal planning can save you time and money.</p>
        </div>
        <div className={styles.sectionBody}>
          <div className={styles.image}>
            <img src={imageSrc} alt="" />
          </div>
          <div className={styles.recipes}>
            {sideDishes && sideDishes.length > 0
              ? sideDishes.map((recipe) => (
                  <div className={styles.recipe} key={recipe.id}>
                    <Recipe size="sm" recipe={recipe} />
                  </div>
                ))
              : Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div className={styles.recipe} key={index}>
                      <RecipeSkeleton />
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SideDishes;
