import { JoinWithUs } from "../../components/Sections";
import styles from "./ListLayout.module.scss";
import ReactPaginate from "react-paginate";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import usePaginate from "../../utils/usePaginate";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { Grid, GridItem } from "../../components/Grid";
import Recipe from "../../components/Recipe";
import { RecipeSkeleton } from "../../components/Skeleton";

function ListLayout({ title = "", recipes, isPaginate, error = false, children }) {
  const [currentItems, pageCount, handlePageClick, wrapperRef] = usePaginate(recipes, ITEMS_PER_PAGE);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className="container">
        {children}
        {!error && (
          <div ref={wrapperRef}>
            <Grid gx={36} gy={48} colsNum={4}>
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
        )}
        {isPaginate && (
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
        )}
      </div>
      <JoinWithUs />
    </div>
  );
}

export default ListLayout;
