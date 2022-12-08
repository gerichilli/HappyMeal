import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Recipe.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Lightbox } from "react-modal-image";
import ReactTooltip from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdOutlineBookmarkAdded, MdOutlineBookmarkBorder, MdOutlinePrint } from "react-icons/md";
import { IconCheck } from "../../assets/icons/icons";
import _ from "lodash";
import { getRecipesById, getLastestRecipes, getRecipesByCategory } from "../../services/apiServices";
import formatRecipe from "../../utils/formatRecipe";
import mapRecipes from "../../utils/mapRecipes";
import { MAX_REVIEW_RECIPES } from "../../utils/constants";
import AspectRatio from "../../components/AspectRatio";
import Badge from "../../components/Badge";
import RecipeComponent from "../../components/Recipe";
import RecipesSlide from "../../components/RecipesSlide";
import { RecipeSkeleton } from "../../components/Skeleton";
import Seo from "../../components/Seo";
import useSavedRecipe from "../../utils/useSavedRecipe";

function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState("");
  const [lastestRecipes, setLastestRecipes] = useState([]);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isSaved, handleAddBookmark] = useSavedRecipe(false, recipe);

  useEffect(() => {
    getRecipe();
  }, [id]);

  useEffect(() => {
    fetchLastestRecipes();
  }, []);

  useEffect(() => {
    if (category) {
      fetchRelatedRecipes();
    }
  }, [category]);

  async function getRecipe() {
    setRecipe({});
    const res = await getRecipesById(id);

    if (res && res.status === 200) {
      const rec = formatRecipe(res.data);
      setRecipe(rec);

      if (rec.category) {
        setCategory(rec.category);
      }
    } else {
      navigate("/404");
      return;
    }
  }

  async function fetchLastestRecipes() {
    const res = await getLastestRecipes();

    if (res && res.status === 200) {
      let recipes = res.data.slice(0, 4);

      recipes = mapRecipes(recipes);
      setLastestRecipes(recipes);
    }
  }

  async function fetchRelatedRecipes() {
    const res = await getRecipesByCategory(category);

    if (res && res.status === 200) {
      let recipes = res.data.slice(0, MAX_REVIEW_RECIPES);

      recipes = mapRecipes(recipes);
      setRelatedRecipes(recipes);
    }
  }

  function handleCloseLightbox() {
    setShowLightbox(false);
    setLightboxImage(null);
  }

  function handleShowLightBox(imgSrc) {
    if (!imgSrc) return;
    setShowLightbox(true);
    setLightboxImage(imgSrc);
  }

  return (
    <>
      <Seo title={recipe && recipe.title ? recipe.title : ""} />
      <div className={styles.wrapper}>
        <div className={styles.mainSection}>
          {!_.isEmpty(recipe) && (
            <section className={styles.recipe}>
              <div className="container">
                <div className={styles.header}>
                  <div className={styles.bannerWrapper}>
                    <AspectRatio ratio={1}>
                      <LazyLoadImage
                        src={recipe.thumbnail}
                        alt=""
                        className={styles.image}
                        effect="blur"
                        onClick={() => handleShowLightBox(recipe.thumbnail)}
                      />
                    </AspectRatio>
                  </div>
                  <div className={styles.detailWrapper}>
                    {recipe.youtube && (
                      <a className={styles.watchBtn} href={recipe.youtube} target="_blank" rel="noreferrer">
                        <AiOutlinePlayCircle size="1.5em" />
                        <span>Watch</span>
                      </a>
                    )}
                    <div className={styles.headline}>
                      <h1 className={styles.title}>{recipe.title}</h1>
                      <div className={styles.tags}>
                        {recipe.tags && recipe.tags.length > 0 && recipe.tags.map((tag) => <Badge key={tag} text={tag} />)}
                      </div>
                      <div className={styles.division}>
                        {recipe.category && <span>{recipe.category}</span>}
                        {recipe.area && <span>{recipe.area}</span>}
                      </div>
                    </div>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} onClick={handleAddBookmark} disabled={isSaved}>
                        {isSaved ? (
                          <>
                            <MdOutlineBookmarkAdded size="1.5em" />
                            <span>Recipe Saved</span>
                          </>
                        ) : (
                          <>
                            <MdOutlineBookmarkBorder size="1.5em" />
                            <span>Save Recipe</span>
                          </>
                        )}
                      </button>
                      <button className={styles.actionBtn}>
                        <MdOutlinePrint size="1.5em" />
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.main}>
                  <div className={styles.recipeInfo}>
                    <div className={styles.ingredients}>
                      <h2 className={styles.sectionTitle}>Ingredients</h2>
                      <div className={styles.sectionBody}>
                        {recipe.ingredients.length > 0 && (
                          <ul className={styles.ingredientsList}>
                            {recipe.ingredients.map((ingredient, index) => (
                              <li key={`${ingredient.name}${index}${ingredient.measure}`} className={styles.ingredient}>
                                <label className={styles.label}>
                                  <input type="checkbox" name="ingredient" className="sr-only" />
                                  <span className="checkbox">
                                    <IconCheck />
                                  </span>
                                  <span
                                    className={styles.ingredientName}
                                    data-html={true}
                                    data-tip={ReactDOMServer.renderToString(
                                      <img src={`https://www.themealdb.com/images/ingredients/${ingredient.name}-Small.png`} alt="" />
                                    )}
                                    data-class={styles.tooltip}
                                    data-padding="6px"
                                    data-arrow-color="transparent"
                                    data-offset="{ 'left': -20 }"
                                  >
                                    {ingredient.name}
                                    <ReactTooltip place="right" type="light" effect="solid" />
                                  </span>
                                </label>
                                <span className={styles.ingredientMeasure}>{ingredient?.measure}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className={styles.instructions}>
                      <h2 className={styles.sectionTitle}>Instructions</h2>
                      <div className={styles.sectionBody}>{recipe.instructions}</div>
                    </div>
                  </div>
                  <aside className={styles.lastest}>
                    <h2 className={styles.sectionTitle}>Lastest</h2>
                    <div className={styles.lastestWrapper}>
                      {lastestRecipes && lastestRecipes.length > 0
                        ? lastestRecipes.map((recipe) => <RecipeComponent recipe={recipe} size="lg" key={recipe.id} />)
                        : Array(4)
                            .fill(0)
                            .map((_, index) => <RecipeSkeleton key={index} />)}
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          )}
        </div>
        <RecipesSlide title="You might also like" recipes={relatedRecipes} recipeSize="md" />
      </div>
      {showLightbox && (
        <Lightbox
          medium={lightboxImage}
          large={lightboxImage}
          alt={recipe && recipe.title ? recipe.title : "Recipe Image"}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  );
}

export default Recipe;
