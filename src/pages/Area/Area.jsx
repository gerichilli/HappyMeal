import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getRecipesByArea } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";

function Area() {
  const { area } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
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
      navigate("/404");
      return;
    }
  }
  return (
    <>
      <Seo title={area} path={location.pathname} />
      <ListLayout title={area} isPaginate={true} recipes={recipes} />
    </>
  );
}

export default Area;
