import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../../components/Seo";
import AlphabetLayout from "../../layout/AlphabetLayout";
import { getIngredientList } from "../../services/apiServices";

function IngredientList() {
  const location = useLocation();
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    fetchIngredientList();
  }, []);

  async function fetchIngredientList() {
    const res = await getIngredientList();

    if (res && res.status === 200) {
      setIngredientList(res.data);
    }
  }

  return (
    <>
      <Seo title="All ingredients" path={location.pathname} />
      <AlphabetLayout list={ingredientList} sortBy="strIngredient" displayBy="strIngredient" path="/ingredient" />
    </>
  );
}

export default IngredientList;
