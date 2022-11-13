import { useState, useEffect } from "react";
import styles from "./Category.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getCategoriesDetail, getRecipesByCategory } from "../../services/apiServices";
import { Grid, GridItem } from "../../components/Grid";
import Recipe from "../../components/Recipe";
import mapRecipes from "../../utils/mapRecipes";
import { usePaginate } from "../../utils/usePaginate";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import Skeleton, { RecipeSkeleton } from "../../components/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Category() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [currentItems, pageCount, handlePageClick, wrapperRef] = usePaginate(
    recipes,
    ITEMS_PER_PAGE
  );

  useEffect(() => {
    fetchRecipes();
  }, [category]);

  async function fetchRecipes() {
    setRecipes([]);
    setCategoryInfo(null);
    const res = await getRecipesByCategory(category);

    if (res && res.status === 200) {
      const recs = mapRecipes(res.data);
      setRecipes(recs);

      // Get category description
      const categoriesRes = await getCategoriesDetail(); // Get all the categories

      if (categoriesRes && categoriesRes.status === 200) {
        const currentCategoryIndex = categoriesRes.data.findIndex(
          (item) => item.strCategory === category
        );
        if (currentCategoryIndex > -1)
          setCategoryInfo({
            title: categoriesRes.data[currentCategoryIndex].strCategory,
            thumbnail: categoriesRes.data[currentCategoryIndex].strCategoryThumb,
            description: categoriesRes.data[currentCategoryIndex].strCategoryDescription,
          });
      }
    } else {
      navigate("/404");
      return;
    }
  }
  return (
    <>
      <Seo title={category} path={location.pathname} />
      <ListLayout
        title={category}
        isPaginate={true}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      >
        {categoryInfo ? (
          <div className={styles.sectionTop}>
            {categoryInfo.thumbnail && (
              <div className={styles.infoImage}>
                <LazyLoadImage src={categoryInfo.thumbnail} alt="" />
              </div>
            )}
            <p className={styles.infoBody}>{categoryInfo.description}</p>
          </div>
        ) : (
          <div className={styles.sectionTop}>
            <div className={styles.infoImage}>
              <Skeleton type="image" />
            </div>
            <div className={styles.infoBody}>
              <Skeleton type="text" />
              <Skeleton type="text" />
              <Skeleton type="text" />
              <Skeleton type="text" />
              <Skeleton type="text" />
            </div>
          </div>
        )}
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

export default Category;
