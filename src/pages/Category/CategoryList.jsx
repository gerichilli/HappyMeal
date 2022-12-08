import { useEffect } from "react";
import { useState } from "react";
import Seo from "../../components/Seo";
import AlphabetLayout from "../../layout/AlphabetLayout";
import { getCategoryList } from "../../services/apiServices";

function CategoryList() {
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
      <Seo title="All categories" />
      <AlphabetLayout list={categoryList} sortBy="strCategory" displayBy="strCategory" path="/category" />
    </>
  );
}

export default CategoryList;
