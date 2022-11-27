import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getAllSavedRecipes, postAddSavedRecipe } from "../services/apiServices";
import { getSavedRecipes } from "../redux/action/recipeAction";

export default function useSavedRecipe(initialState, recipe) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userId = useSelector((state) => state.user.account.userId);
  const savedRecipes = useSelector((state) => state.savedRecipes);
  const [isSaved, setIsSaved] = useState(initialState);

  useEffect(() => {
    const recipeIndex = savedRecipes.findIndex((item) => item.id === recipe.id);
    setIsSaved(recipeIndex > -1);
  }, [recipe, isAuthenticated]);

  async function handleAddBookmark() {
    if (!isAuthenticated) {
      toast.error("You need to login to save this recipe");
      return;
    }

    if (isSaved) {
      return;
    }

    let recipeData = {
      id: recipe?.id,
      title: recipe?.title,
      thumbnail: recipe?.thumbnail,
    };

    const res = await postAddSavedRecipe(recipeData, userId);
    if (res && res.status === 200) {
      toast.success("Recipe saved");
      setIsSaved(true);

      // Update redux state
      const savedIdsRes = await getAllSavedRecipes(userId);
      if (savedIdsRes && savedIdsRes.status === 200) {
        dispatch(getSavedRecipes(savedIdsRes.data));
      }
    }
  }

  return [isSaved, handleAddBookmark];
}
