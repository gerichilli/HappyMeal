import { useState, useEffect } from "react";
import { getLastestRecipes } from "../../../services/apiServices";
import { MAX_REVIEW_RECIPES } from "../../../utils/constants";
import mapRecipes from "../../../utils/mapRecipes";
import RecipesSlide from "../../RecipesSlide";
import { IconClock } from "../../../assets/icons/icons";

function LastestRecipes() {
  const [lastestRecipes, setLastestRecipes] = useState([]);

  useEffect(() => {
    fetchLastestRecipes();
  }, []);

  async function fetchLastestRecipes() {
    const res = await getLastestRecipes();

    if (res && res.status === 200) {
      let recipes = res.data.slice(0, MAX_REVIEW_RECIPES);

      recipes = mapRecipes(recipes);
      setLastestRecipes(recipes);
    }
  }

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
    />
  );
}

export default LastestRecipes;
