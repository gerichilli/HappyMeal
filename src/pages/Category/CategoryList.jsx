import { useSelector } from "react-redux";
import Seo from "../../components/Seo";
import AlphabetLayout from "../../layout/AlphabetLayout";

function CategoryList() {
  const categories = useSelector((state) => state.recipes.list.categories);

  return (
    <>
      <Seo title="All categories" />
      <AlphabetLayout list={categories} sortBy="strCategory" displayBy="strCategory" path="/category" />
    </>
  );
}

export default CategoryList;
