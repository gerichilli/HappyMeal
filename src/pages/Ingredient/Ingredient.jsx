import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getRecipesByIngredients } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";
import NotFound from "../../components/NotFound";

function Ingredient() {
  const { ingredient } = useParams();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, [ingredient]);

  async function fetchRecipes() {
    setRecipes([]);
    const res = await getRecipesByIngredients(ingredient);

    if (res && res.status === 200) {
      const recs = mapRecipes(res.data);
      setRecipes(recs);
    } else {
      setError(true);
      return;
    }
  }
  return (
    <>
      <Seo title={ingredient} path={location.pathname} />
      {error ? (
        <NotFound message="Coudn't find any recipes with this ingredient" back={{ title: "Ingredients List", path: "/ingredient" }} />
      ) : (
        <ListLayout title={ingredient} isPaginate={true} recipes={recipes} />
      )}
    </>
  );
}

export default Ingredient;
