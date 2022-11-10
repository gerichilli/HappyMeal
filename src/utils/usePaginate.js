import { useState, useEffect, useRef } from "react";

export function usePaginate(items, itemsPerPage) {
  const wrapperRef = useRef(null); // Use to scroll to top of wrapper element when page changes
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  function handlePageClick(event) {
    wrapperRef.current.scrollIntoView();
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  }

  return [currentItems, pageCount, handlePageClick, wrapperRef];
}
