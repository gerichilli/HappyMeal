import { useSelector } from "react-redux";
import Seo from "../../components/Seo";
import AlphabetLayout from "../../layout/AlphabetLayout";

function AreaList() {
  const areas = useSelector((state) => state.recipes.list.areas);

  return (
    <>
      <Seo title="All areas" />
      <AlphabetLayout list={areas} sortBy="strArea" displayBy="strArea" path="/area" />
    </>
  );
}

export default AreaList;
