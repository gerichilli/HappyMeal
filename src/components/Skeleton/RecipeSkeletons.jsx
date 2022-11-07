import AspectRatio from "../AspectRatio";
import Skeleton from "./Skeleton";

function RecipesSkeleton({ numberOfRecipes = 1, ...props }) {
  return (
    <div>
      <AspectRatio ratio={1}>
        <Skeleton type="image" />
      </AspectRatio>
      <Skeleton type="title" />
      <Skeleton type="text" />
      <Skeleton type="text" />
      <div>
        <Skeleton type="inlineBox" />
        <Skeleton type="inlineBox" />
      </div>
    </div>
  );
}

export default RecipesSkeleton;
