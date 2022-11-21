import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./Search.module.scss";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getRecipesByName } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";
import loading from "../../assets/images/notfound.png";

function Search() {
  const { query } = useParams();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);

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
      <ListLayout title="Search Results" isPaginate={true} recipes={recipes} error={error}>
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
          </>
        )}
      </ListLayout>
    </>
  );
}

export default Search;
