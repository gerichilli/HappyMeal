import { useState } from "react";
import styles from "./SearchForm.module.scss";
import { FiSearch } from "react-icons/fi";
import useDebounce from "../../utils/useDebounce";
import { useEffect } from "react";
import { getRecipesByName } from "../../services/apiServices";
import { MAX_REVIEW_RECIPES } from "../../utils/constants";
import mapRecipes from "../../utils/mapRecipes";
import { Link, useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useDebounce(query, 300);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewResults, setPreviewResults] = useState([]);

  useEffect(() => {
    handleFetchResults();
  }, [debounceQuery]); // Fetch results when debounce query or queryBy changes

  useEffect(() => {
    setIsPreviewOpen(previewResults && previewResults.length > 0 && debounceQuery);
  }, [previewResults, debounceQuery]); // Open preview when previewResults and debounceQuery is not empty

  async function handleFetchResults() {
    if (debounceQuery) {
      const res = await getRecipesByName(debounceQuery);

      if (res && res.status === 200) {
        const recipes = mapRecipes(res.data.slice(0, MAX_REVIEW_RECIPES));
        setPreviewResults(recipes);
      } else {
        setPreviewResults([]);
      }
    }
  }

  function handleResetForm() {
    setQuery("");
    setDebounceQuery("");
    setPreviewResults([]);
    setIsPreviewOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleResetForm();
    navigate(`/search/${query}`);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="Ex: sushi" value={query} onChange={(event) => setQuery(event.target.value)} />
      <button type="submit" aria-label="Submit">
        <FiSearch />
      </button>
      {isPreviewOpen && (
        <ul className={styles.preview}>
          {previewResults.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`} onClick={handleResetForm}>
                <div className={styles.image}>
                  <img src={`${recipe.thumbnail}/preview`} alt="" />
                </div>
                <h3>{recipe.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchForm;
