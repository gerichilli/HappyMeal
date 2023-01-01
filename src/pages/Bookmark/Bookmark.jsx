import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./Bookmark.module.scss";
import Seo from "../../components/Seo";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { Grid, GridItem } from "../../components/Grid";
import AspectRatio from "../../components/AspectRatio";
import usePaginate from "../../utils/usePaginate";
import toast from "react-hot-toast";
import { removeBookmark } from "../../redux/thunks/userThunk";

function Bookmark() {
  const dispatch = useDispatch();
  const savedRecipes = useSelector((state) => state.user.bookmarks.list);
  const removeRecipeProcessStatus = useSelector((state) => state.user.status.removeRecipeProcessStatus);
  const toastMessage = useSelector((state) => state.user.toast.toastMessage);
  const userId = useSelector((state) => state.user.account.userId);

  const [currentItems, pageCount, handlePageClick, wrapperRef] = usePaginate(savedRecipes, 15);

  useEffect(() => {
    if (removeRecipeProcessStatus === "fulfilled") {
      toast.success("Recipe removed from bookmark");
    } else if (removeRecipeProcessStatus === "rejected") {
      toast.error(toastMessage);
    }
  }, [removeRecipeProcessStatus, toastMessage]);

  async function handleDeleteSavedRecipe(recipeId) {
    dispatch(removeBookmark({ recipeId, userId }));
  }

  return (
    <>
      <Seo title="My Saved Recipes" />
      <section className={styles.wrapper}>
        <div className="container">
          <div className={styles.heading}>
            <h1 className={styles.title}>My Saved Recipes</h1>
            <p className={styles.description}>These recipes are saved to your account, so you can revisit them anytime.</p>
          </div>
          <div className={styles.content} ref={wrapperRef}>
            <Grid gx={30} gy={30} colsNum={4}>
              {currentItems &&
                currentItems.length > 0 &&
                currentItems.map((recipe) => (
                  <GridItem key={recipe.id}>
                    <div className={styles.recipe}>
                      <Link to={`/recipe/${recipe.id}`} className={styles.recipeImage}>
                        <AspectRatio ratio={1}>
                          <LazyLoadImage src={`${recipe.thumbnail}`} alt={recipe.title} />
                        </AspectRatio>
                      </Link>
                      <div className={styles.recipeInfo}>
                        <h2 className={styles.recipeTitle}>
                          <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </h2>
                      </div>
                      <div className={styles.recipeBtn}>
                        <button className={styles.btn} aria-label="Remove Recipe" onClick={() => handleDeleteSavedRecipe(recipe.id)}>
                          <MdOutlineBookmarkAdded />
                        </button>
                      </div>
                    </div>
                  </GridItem>
                ))}
            </Grid>
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
      </section>
    </>
  );
}

export default Bookmark;
