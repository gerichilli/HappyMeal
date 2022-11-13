import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getRecipesByArea } from "../../services/apiServices";
import { Grid, GridItem } from "../../components/Grid";
import Recipe from "../../components/Recipe";
import mapRecipes from "../../utils/mapRecipes";
import { usePaginate } from "../../utils/usePaginate";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { RecipeSkeleton } from "../../components/Skeleton";

function Area() {
  const { area } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentItems, pageCount, handlePageClick, wrapperRef] = usePaginate(
    recipes,
    ITEMS_PER_PAGE
  );

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
      <ListLayout
        title={area}
        isPaginate={true}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      >
        <div ref={wrapperRef}>
          <Grid gx={24} gy={30} colsNum={4}>
            {currentItems && currentItems.length > 0
              ? currentItems.map((recipe) => (
                  <GridItem key={recipe.id}>
                    <Recipe recipe={recipe} />
                  </GridItem>
                ))
              : Array(ITEMS_PER_PAGE / 2)
                  .fill(0)
                  .map((_, index) => (
                    <GridItem key={index}>
                      <RecipeSkeleton />
                    </GridItem>
                  ))}
          </Grid>
        </div>
      </ListLayout>
    </>
  );
}

export default Area;
