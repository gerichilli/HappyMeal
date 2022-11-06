import { useState, useEffect } from "react";
import { getLastestRecipes } from "../../../services/apiServices";
import { MAX_REVIEW_RECIPES } from "../../../utils/constants";
import mapRecipes from "../../../utils/mapRecipes";
import RecipesSlide from "../../RecipesSlide";
import { IconClock } from "../../../assets/icons/icons";

function VegetarianRecipes() {
  const [lastestRecipes, setLastestRecipes] = useState([]);

  useEffect(() => {
    fetchLastestRecipes();
  }, []);

  async function fetchLastestRecipes() {
    const response = await getLastestRecipes();

    if (response.status === 200) {
      let recipes = response.data.slice(0, MAX_REVIEW_RECIPES);

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

export default VegetarianRecipes;
