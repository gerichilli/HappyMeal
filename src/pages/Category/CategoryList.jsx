import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../../components/Seo";
import AlphabetLayout from "../../layout/AlphabetLayout";
import { getCategoryList } from "../../services/apiServices";

function CategoryList() {
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategoryList();
  }, []);

  async function fetchCategoryList() {
    const res = await getCategoryList();

    if (res && res.status === 200) {
      setCategoryList(res.data);
    }
  }

  return (
    <>
      <Seo title="All categories" path={location.pathname} />
      <AlphabetLayout list={categoryList} sortBy="strCategory" displayBy="strCategory" path="/category" />
    </>
  );
}

export default CategoryList;
