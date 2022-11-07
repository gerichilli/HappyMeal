import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Recipe.module.scss";
import Layout from "../../layout/Layout";
import { getRecipesById } from "../../services/apiServices";
import formatRecipe from "../../utils/formatRecipe";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getRecipe();
  }, []);

  async function getRecipe() {
    const res = await getRecipesById(id);

    if (res.status === 200) {
      const rec = formatRecipe(res.data);
      setRecipe(rec);
      console.log(rec);
    }
  }

  return (
    <Layout path={`/recipe/${id}`}>
      <div className="container">{id}</div>
    </Layout>
  );
}

export default Recipe;
