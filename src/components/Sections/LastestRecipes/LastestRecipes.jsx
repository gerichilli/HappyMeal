import { useSelector } from "react-redux";
import { MAX_REVIEW_RECIPES } from "../../../utils/constants";
import RecipesSlide from "../../RecipesSlide";
import { IconClock } from "../../../assets/icons/icons";

function LastestRecipes() {
  const recipes = useSelector((state) => state.recipes.lastestRecipes.meals);
  const lastestRecipes = recipes.slice(0, MAX_REVIEW_RECIPES);

  return (
    <RecipesSlide
      title={
        <>
          <IconClock /> Recently Update
        </>
      }
      description="Get lastest recipes"
      recipes={lastestRecipes}
      recipeSize="lg"
      pageLink="/browse/lastest"
    />
  );
}

export default LastestRecipes;
