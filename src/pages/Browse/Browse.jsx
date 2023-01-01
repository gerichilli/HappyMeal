import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";

function Browse() {
  const { browseBy } = useParams();
  const navigate = useNavigate();
  const lastestRecipes = useSelector((state) => state.recipes.lastestRecipes.meals);
  const randomRecipes = useSelector((state) => state.recipes.randomRecipes.meals);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (browseBy === "lastest") {
      setRecipes(lastestRecipes);
    } else if (browseBy === "random") {
      setRecipes(randomRecipes);
    } else {
      navigate("/404");
    }
  }, [browseBy, lastestRecipes, randomRecipes]);

  return (
    <>
      <Seo title={browseBy === "lastest" ? "Lastest Recipes" : "Random Recipes"} />
      <ListLayout title={browseBy === "lastest" ? "Lastest Recipes" : "Random Recipes"} isPaginate={true} recipes={recipes} />
    </>
  );
}

export default Browse;
