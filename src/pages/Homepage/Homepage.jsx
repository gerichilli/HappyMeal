import { useLocation } from "react-router-dom";
import {
  Banner,
  DessertRecipes,
  Event,
  Instagram,
  JoinWithUs,
  LastestRecipes,
  SideDishes,
  VegetarianRecipes,
} from "../../components/Sections";
import Seo from "../../components/Seo";

function Homepage() {
  const location = useLocation();

  return (
    <>
      <Seo
        title="HappyMeal - Less Stress. More Joy"
        description="Simply Recipes is here to help you cook delicious meals with less stress and more joy. We offer recipes and cooking advice for home cooks, by home cooks."
        path={location.pathname}
      />
      <Banner />
      <LastestRecipes />
      <VegetarianRecipes />
      <Event />
      <DessertRecipes />
      <SideDishes />
      <JoinWithUs />
      <Instagram />
    </>
  );
}

export default Homepage;
