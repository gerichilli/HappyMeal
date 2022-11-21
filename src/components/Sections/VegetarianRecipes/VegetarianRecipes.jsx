import { useState, useEffect } from "react";
import { getRecipesByCategory } from "../../../services/apiServices";
import { MAX_REVIEW_RECIPES } from "../../../utils/constants";
import mapRecipes from "../../../utils/mapRecipes";
import RecipesSlide from "../../RecipesSlide";
import { IconVegetable } from "../../../assets/icons/icons";

function VegetarianRecipes() {
  const [vegetarianRecipes, setVegetarianRecipes] = useState([]);

  useEffect(() => {
    fetchVegetarianRecipes();
  }, []);

  async function fetchVegetarianRecipes() {
    const res = await getRecipesByCategory("Vegetarian");

    if (res && res.status === 200) {
      let recipes = res.data.slice(0, MAX_REVIEW_RECIPES);

      recipes = mapRecipes(recipes);
      setVegetarianRecipes(recipes);
    }
  }

  return (
    <RecipesSlide
      title={
        <>
          <IconVegetable /> Vegetarianism
        </>
      }
      description="Find healthy, delicious weight-loss and diet recipes"
      recipes={vegetarianRecipes}
      recipeSize="lg"
      pageLink="/category/Vegetarian"
    />
  );
}

export default VegetarianRecipes;
