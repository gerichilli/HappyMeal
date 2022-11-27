import { useState, useEffect } from "react";
import styles from "./Category.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getCategoriesDetail, getRecipesByCategory } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";
import Skeleton from "../../components/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NotFound from "../../components/NotFound";

function Category() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [error, setError] = useState(false);

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
        const currentCategoryIndex = categoriesRes.data.findIndex((item) => item.strCategory === category);
        if (currentCategoryIndex > -1)
          setCategoryInfo({
            title: categoriesRes.data[currentCategoryIndex].strCategory,
            thumbnail: categoriesRes.data[currentCategoryIndex].strCategoryThumb,
            description: categoriesRes.data[currentCategoryIndex].strCategoryDescription,
          });
      }
    } else {
      setError(true);
      return;
    }
  }
  return (
    <>
      <Seo title={category} path={location.pathname} />
      {error ? (
        <NotFound message="Coudn't find any recipes with this category" back={{ title: "Categories List", path: "/category" }} />
      ) : (
        <ListLayout title={category} isPaginate={true} recipes={recipes}>
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
        </ListLayout>
      )}
    </>
  );
}

export default Category;
