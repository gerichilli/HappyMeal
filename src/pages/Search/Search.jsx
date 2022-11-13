import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./Search.module.scss";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getRecipesByName } from "../../services/apiServices";
import { Grid, GridItem } from "../../components/Grid";
import Recipe from "../../components/Recipe";
import mapRecipes from "../../utils/mapRecipes";
import { usePaginate } from "../../utils/usePaginate";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { RecipeSkeleton } from "../../components/Skeleton";
import loading from "../../assets/images/notfound.png";

function Search() {
  const { query } = useParams();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);
  const [currentItems, pageCount, handlePageClick, wrapperRef] = usePaginate(
    recipes,
    ITEMS_PER_PAGE
  );

  useEffect(() => {
    fetchResults();
  }, [query]);

  async function fetchResults() {
    setRecipes([]);
    setError(false);
    const res = await getRecipesByName(query);

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
      <Seo path={location.pathname} />
      <ListLayout
        title="Search Results"
        isPaginate={true}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      >
        <div ref={wrapperRef}>
          {error ? (
            <div className={styles.error}>
              <img src={loading} alt="" />
              <p>Sorry we can't find any results for "{query}".</p>
            </div>
          ) : (
            <>
              <p className={styles.message}>
                Found {recipes.length} results for "{query}"
              </p>
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
            </>
          )}
        </div>
      </ListLayout>
    </>
  );
}

export default Search;
