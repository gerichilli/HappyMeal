import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListLayout from "../../layout/ListLayout";
import Seo from "../../components/Seo";
import { getCategoriesDetail, getRecipesByCategory } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";
import Skeleton from "../../components/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Bookmark() {
  return (
    <>
      <p>Bookmark</p>
    </>
  );
}

export default Bookmark;
