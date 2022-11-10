import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import styles from "./Browse.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPaginate from "react-paginate";
import { usePaginate } from "../../utils/usePaginate";
import {
  getRecipesByCategory,
  getRecipesByArea,
  getRecipesByMainIngredient,
  getCategoriesDetail,
  getLastestRecipes,
  getRandomRecipes,
} from "../../services/apiServices";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { JoinWithUs } from "../../components/Sections";
import Recipe from "../../components/Recipe";
import { RecipeSkeleton } from "../../components/Skeleton";
import mapRecipes from "../../utils/mapRecipes";
import Seo from "../../components/Seo";

function Browse() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("Results");
  const [categoryInfo, setCategoryInfo] = useState(null); // Description is used to show for category browsing
  const [recipes, setRecipes] = useState([]);
  const [currentItems, pageCount, handlePageClick, wrapperRef] = usePaginate(
    recipes,
    ITEMS_PER_PAGE
  );

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  async function fetchResults() {
    setRecipes([]);
    setTitle("Results");
    setCategoryInfo(null);

    let recs = []; // store recipes get from API
    let query = ""; // store query string to set title and get API data

    // CATEGORY QUERY
    if (searchParams.has("category")) {
      query = searchParams.get("category");
      const res = await getRecipesByCategory(query);

      if (res && res.status === 200) {
        recs = mapRecipes(res.data);

        // Get category description
        const categoriesRes = await getCategoriesDetail(); // Get all the categories

        if (categoriesRes && categoriesRes.status === 200) {
          const currentCategoryIndex = categoriesRes.data.findIndex(
            (item) => item.strCategory === query
          );

          // Set category description if found
          if (currentCategoryIndex > -1) {
            setCategoryInfo({
              title: categoriesRes.data[currentCategoryIndex].strCategory,
              image: categoriesRes.data[currentCategoryIndex].strCategoryThumb,
              description: categoriesRes.data[currentCategoryIndex].strCategoryDescription,
            });
          }
        }
      }
    }
    // AREA QUERY
    else if (searchParams.has("area")) {
      query = searchParams.get("area");
      const res = await getRecipesByArea(query);

      if (res && res.status === 200) {
        recs = mapRecipes(res.data);
      }
    }
    // INGREDIENT QUERY
    else if (searchParams.has("ingredient")) {
      query = searchParams.get("ingredient");
      const res = await getRecipesByMainIngredient(query);

      if (res && res.status === 200) {
        recs = mapRecipes(res.data);
      }
    }

    // SORTING QUERIES
    if (searchParams.has("sort")) {
      query = searchParams.get("sort");

      if (query === "lastest") {
        const res = await getLastestRecipes();

        if (res && res.status === 200) {
          recs = mapRecipes(res.data);
        }
      } else if (query === "randoms") {
        const res = await getRandomRecipes();

        if (res && res.status === 200) {
          recs = mapRecipes(res.data);
        }
      }
    }
    // INVALID QUERY
    else {
      navigate("/404");
      return;
    }

    setTitle("Results for " + query);
    setRecipes(recs);
  }

  return (
    <>
      <Seo title={title} path={location.pathname} />
      <section className={styles.section}>
        <div className="container">
          <h1 className={styles.sectionTitle}>{title}</h1>
          <div className={styles.sectionBody}>
            {categoryInfo && (
              <div className={styles.sectionInfo}>
                {categoryInfo.image && (
                  <div className={styles.infoImage}>
                    <LazyLoadImage src={categoryInfo.image} alt="" />
                  </div>
                )}
                <p className={styles.infoBody}>{categoryInfo.description}</p>
              </div>
            )}
            <div className={styles.sectionMain}>
              <div className={styles.recipes} ref={wrapperRef}>
                {recipes && recipes.length > 0
                  ? currentItems.map((recipe) => (
                      <div className={styles.recipe} key={recipe.id}>
                        <Recipe size="sm" recipe={recipe} />
                      </div>
                    ))
                  : Array(ITEMS_PER_PAGE / 2)
                      .fill(0)
                      .map((_, index) => (
                        <div className={styles.recipe} key={index}>
                          <RecipeSkeleton />
                        </div>
                      ))}
              </div>
              <ReactPaginate
                nextLabel={<GrCaretNext />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={<GrCaretPrevious />}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item page-item--prev"
                previousLinkClassName="page-link"
                nextClassName="page-item page-item--next"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </section>
      <JoinWithUs />
    </>
  );
}

export default Browse;
