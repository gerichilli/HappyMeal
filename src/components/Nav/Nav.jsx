import { useState, useEffect } from "react";
import styles from "./Nav.module.scss";
import NavDropdown from "./NavDropdown";
import { getCategoryList, getAreaList, getIngredientList } from "../../services/apiServices";

function Nav() {
  const [openDropdown, setOpenDropdown] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    fetchCategoryList();
    fetchAreaList();
    fetchIngredientList();
  }, []);

  async function fetchCategoryList() {
    const res = await getCategoryList();

    if (res && res.status === 200) {
      setCategoryList(res.data);
    }
  }

  async function fetchAreaList() {
    const res = await getAreaList();

    if (res && res.status === 200) {
      setAreaList(res.data);
    }
  }

  async function fetchIngredientList() {
    const res = await getIngredientList();

    if (res && res.status === 200) {
      setIngredientList(res.data);
    }
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <NavDropdown label="Categories" type="category" listData={categoryList} isOpen={openDropdown === "category"} setOpenDropdown={setOpenDropdown} />
        <NavDropdown label="Areas" type="area" listData={areaList} isOpen={openDropdown === "area"} setOpenDropdown={setOpenDropdown} />
        <NavDropdown label="Ingredients" type="ingredient" listData={ingredientList} isOpen={openDropdown === "ingredient"} setOpenDropdown={setOpenDropdown} />
      </ul>
    </nav>
  );
}

export default Nav;
