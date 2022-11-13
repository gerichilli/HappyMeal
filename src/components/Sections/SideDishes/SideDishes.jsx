import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SideDishes.module.scss";
import { getRandomRecipes } from "../../../services/apiServices";
import mapRecipes from "../../../utils/mapRecipes";
import { MAX_RANDOM_RECIPES } from "../../../utils/constants";
import { HiArrowSmRight } from "react-icons/hi";
import imageSrc from "../../../assets/images/sidedishes.jpg";
import Recipe from "../../Recipe";
import { RecipeSkeleton } from "../../Skeleton";
import { Grid, GridItem } from "../../Grid";

function SideDishes() {
  const [sideDishes, setSideDishes] = useState([]);

  useEffect(() => {
    fetchSideDishes();
  }, []);

  async function fetchSideDishes() {
    const res = await getRandomRecipes();

    if (res && res.status === 200) {
      let recipes = res.data.slice(0, MAX_RANDOM_RECIPES);

      recipes = mapRecipes(recipes);
      setSideDishes(recipes);
    }
  }
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Random Recipes</h2>
          <Link to="/browse?sort=randoms" className={styles.link}>
            See more <HiArrowSmRight />
          </Link>
          <p className={styles.description}>Regular meal planning can save you time and money.</p>
        </div>
        <div className={styles.sectionBody}>
          <div className={styles.image}>
            <img src={imageSrc} alt="" />
          </div>
          <div className={styles.recipes}>
            <Grid gx={36} gy={36} colsNum={3}>
              {sideDishes && sideDishes.length > 0
                ? sideDishes.map((recipe) => (
                    <GridItem key={recipe.id}>
                      <Recipe size="sm" recipe={recipe} />
                    </GridItem>
                  ))
                : Array(MAX_RANDOM_RECIPES)
                    .fill(0)
                    .map((_, index) => (
                      <GridItem key={index}>
                        <RecipeSkeleton />
                      </GridItem>
                    ))}
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SideDishes;
