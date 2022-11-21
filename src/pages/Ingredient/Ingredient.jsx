import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getRecipesByIngredients } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";

function Ingredient() {
  const { ingredient } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

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
      navigate("/404");
      return;
    }
  }
  return (
    <>
      <Seo title={ingredient} path={location.pathname} />
      <ListLayout title={ingredient} isPaginate={true} recipes={recipes} />
    </>
  );
}

export default Ingredient;
