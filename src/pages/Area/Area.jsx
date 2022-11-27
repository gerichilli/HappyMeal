import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getRecipesByArea } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";
import NotFound from "../../components/NotFound";

function Area() {
  const { area } = useParams();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, [area]);

  async function fetchRecipes() {
    setRecipes([]);
    const res = await getRecipesByArea(area);

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
      <Seo title={area} path={location.pathname} />
      {error ? (
        <NotFound message="Coudn't find any recipes with this area" back={{ title: "Areas List", path: "/area" }} />
      ) : (
        <ListLayout title={area} isPaginate={true} recipes={recipes} />
      )}
    </>
  );
}

export default Area;
