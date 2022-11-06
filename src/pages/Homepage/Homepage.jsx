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
import Layout from "../../layout/Layout";

function Homepage() {
  return (
    <Layout>
      <Banner />
      <LastestRecipes />
      <VegetarianRecipes />
      <Event />
      <DessertRecipes />
      <SideDishes />
      <JoinWithUs />
      <Instagram />
    </Layout>
  );
}

export default Homepage;
