import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addBookmark } from "../redux/slices/userSlice";
import { useCallback } from "react";

export default function useSavedRecipe(recipe) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.account.isAuthenticated);
  const userId = useSelector((state) => state.user.account.userId);
  const savedRecipes = useSelector((state) => state.user.bookmarks.list);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const recipeIndex = savedRecipes.findIndex((item) => item.id === recipe.id);
    setIsSaved(recipeIndex > -1);
  }, [recipe]);

  const handleAddBookmark = useCallback(async () => {
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

    dispatch(addBookmark({ recipe: recipeData, userId }));
    toast.success("Recipe saved");
    setIsSaved(true);
  }, [isAuthenticated, isSaved, recipe, userId]);

  return [isSaved, handleAddBookmark];
}
