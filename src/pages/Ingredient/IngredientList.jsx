import { useSelector } from "react-redux";
import Seo from "../../components/Seo";
import AlphabetLayout from "../../layout/AlphabetLayout";

function IngredientList() {
  const ingredients = useSelector((state) => state.recipes.list.ingredients);

  return (
    <>
      <Seo title="All ingredients" />
      <AlphabetLayout list={ingredients} sortBy="strIngredient" displayBy="strIngredient" path="/ingredient" />
    </>
  );
}

export default IngredientList;
