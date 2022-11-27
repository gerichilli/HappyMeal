import styles from "./Recipe.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AspectRatio from "../AspectRatio";
import { Link } from "react-router-dom";
import { MdOutlineBookmarkAdded, MdOutlineBookmarkBorder } from "react-icons/md";
import createClassName from "../../utils/createClassName";
import Badge from "../Badge";
import useSavedRecipe from "../../utils/useSavedRecipe";

function Recipe({ size, recipe }) {
  const [isSaved, handleAddBookmark] = useSavedRecipe(false, recipe);

  return (
    <div className={createClassName(styles.recipe, styles[`recipe--${size}`])}>
      <div className={styles.thumb}>
        <button className={styles.btn} disabled={isSaved} aria-label="Save Recipe" onClick={handleAddBookmark}>
          {isSaved ? <MdOutlineBookmarkAdded /> : <MdOutlineBookmarkBorder />}
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
      {recipe.category && <p className={styles.category}>{recipe.category}</p>}
      {recipe.ingredients && recipe.ingredients > 0 && (
        <p className={styles.ingredients}>
          <span className={styles.number}>{recipe.ingredients.length}</span>
          <span>Ingredients</span>
        </p>
      )}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className={styles.tags}>
          {recipe.tags.map((tag) => (
            <Badge key={tag} text={tag} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipe;
