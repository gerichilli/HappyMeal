import { useState, useEffect } from "react";
import { getRecipesByCategory } from "../../../services/apiServices";
import { MAX_REVIEW_RECIPES } from "../../../utils/constants";
import mapRecipes from "../../../utils/mapRecipes";
import RecipesSlide from "../../RecipesSlide";
import { IconHealthy } from "../../../assets/icons/icons";

function DessertRecipes() {
  const [dessertRecipes, setDessertRecipes] = useState([]);

  useEffect(() => {
    fetchDessertRecipes();
  }, []);

  async function fetchDessertRecipes() {
    const res = await getRecipesByCategory("dessert");

    if (res && res.status === 200) {
      let recipes = res.data.slice(0, MAX_REVIEW_RECIPES);

      recipes = mapRecipes(recipes);
      setDessertRecipes(recipes);
    }
  }

  return (
    <RecipesSlide
      title={
        <>
          <IconHealthy /> Dessert
        </>
      }
      description="Simple healthy recipes for your family"
      recipes={dessertRecipes}
      recipeSize="md"
      pageLink="/browse?category=dessert"
    />
  );
}

export default DessertRecipes;
