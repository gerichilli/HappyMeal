import { JoinWithUs } from "../../components/Sections";
import styles from "./ListLayout.module.scss";
import ReactPaginate from "react-paginate";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

function ListLayout({ title = "", isPaginate, handlePageClick, pageCount, children }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className="container">
        {children}
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
