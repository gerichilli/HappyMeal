import styles from "./Recipe.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AspectRatio from "../AspectRatio";
import { Link } from "react-router-dom";
import { HiOutlineBookmark } from "react-icons/hi";
import createClassName from "../../utils/createClassName";
import Badge from "../Badge";

function Recipe({ size, recipe }) {
  return (
    <div className={createClassName(styles.recipe, styles[`recipe--${size}`])}>
      <div className={styles.thumb}>
        <button className={styles.btn}>
          <HiOutlineBookmark />
        </button>
        <Link to={`/recipe/${recipe.id}`} className={styles.imgLink}>
          <AspectRatio ratio={1}>
            <LazyLoadImage src={recipe.thumbnail} alt="" className={styles.image} effect="blur" />
            {/* <img src={recipe.thumbnail} alt="" className={styles.image} /> */}
          </AspectRatio>
        </Link>
      </div>
      <h3 className={styles.title}>
        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
      </h3>
      <p className={styles.category}>{recipe.category}</p>
      <p className={styles.ingredients}>
        <span className={styles.number}>{recipe.ingredients && recipe.ingredients.length}</span>
        <span>Ingredients</span>
      </p>
      <div className={styles.tags}>
        {recipe.tags &&
          recipe.tags.length > 0 &&
          recipe.tags.map((tag) => <Badge key={tag} text={tag} />)}
      </div>
    </div>
  );
}

export default Recipe;
