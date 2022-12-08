import { useEffect } from "react";
import { useState } from "react";
import Seo from "../../components/Seo";
import AlphabetLayout from "../../layout/AlphabetLayout";
import { getAreaList } from "../../services/apiServices";

function AreaList() {
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    fetchAreaList();
  }, []);

  async function fetchAreaList() {
    const res = await getAreaList();

    if (res && res.status === 200) {
      setAreaList(res.data);
    }
  }

  return (
    <>
      <Seo title="All areas" />
      <AlphabetLayout list={areaList} sortBy="strArea" displayBy="strArea" path="/area" />
    </>
  );
}

export default AreaList;
