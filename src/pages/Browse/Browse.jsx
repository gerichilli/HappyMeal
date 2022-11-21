import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getLastestRecipes, getRandomRecipes } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";

function Browse() {
  const { browseBy } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetchRecipes();
  }, [browseBy]);

  async function fetchRecipes() {
    setRecipes([]);
    let res;

    if (browseBy === "lastest") {
      res = await getLastestRecipes();
    } else if (browseBy === "random") {
      res = await getRandomRecipes();
    } else {
      navigate("/404");
      return;
    }

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
      <Seo title={browseBy === "lastest" ? "Lastest Recipes" : "Random Recipes"} path={location.pathname} />
      <ListLayout title={browseBy === "lastest" ? "Lastest Recipes" : "Random Recipes"} isPaginate={true} recipes={recipes} />
    </>
  );
}

export default Browse;
