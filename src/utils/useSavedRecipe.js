import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addBookmark } from "../redux/thunks/userThunk";
import { useCallback } from "react";

export default function useSavedRecipe(recipe) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.account.isAuthenticated);
  const userId = useSelector((state) => state.user.account.userId);
  const savedRecipes = useSelector((state) => state.user.bookmarks.list);
  const saveRecipeProcessStatus = useSelector((state) => state.user.status.saveRecipeProcessStatus);

  const [isSaved, setIsSaved] = useState(false);
  const [savedRecipeId, setSavedRecipeId] = useState(null);

  useEffect(() => {
    const recipeIndex = savedRecipes.findIndex((item) => item.id === recipe.id);
    setIsSaved(recipeIndex > -1);
  }, [recipe.id, savedRecipes]);

  useEffect(() => {
    if (savedRecipeId !== recipe.id) return;

    if (saveRecipeProcessStatus === "fulfilled") {
      toast.success("Recipe saved");
      setIsSaved(true);
      setSavedRecipeId(null);
    } else if (saveRecipeProcessStatus === "rejected") {
      toast.error("Failed to save recipe");
      setSavedRecipeId(null);
    }
  }, [saveRecipeProcessStatus, savedRecipeId, recipe.id]);

  const handleAddBookmark = useCallback(async () => {
    if (isSaved) {
      return;
    }

    if (!isAuthenticated) {
      toast.error("You need to login to save this recipe");
      return;
    }

    let recipeData = {
      id: recipe?.id,
      title: recipe?.title,
      thumbnail: recipe?.thumbnail,
    };

    dispatch(addBookmark({ recipe: recipeData, userId }));
    setSavedRecipeId(recipe.id);
  }, [isAuthenticated, isSaved, recipe, userId]);

  return [isSaved, handleAddBookmark];
}
