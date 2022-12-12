import { useState, useEffect } from "react";
import styles from "./Nav.module.scss";
import NavDropdown from "./NavDropdown";
import { getCategoryList, getAreaList, getIngredientList } from "../../services/apiServices";
import { MAX_DROPDOWN_ITEMS } from "../../utils/constants";

function Nav({ isNavOpenOnMobile, setIsNavOpenOnMobile }) {
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
      setCategoryList(res.data.slice(0, MAX_DROPDOWN_ITEMS));
    }
  }

  async function fetchAreaList() {
    const res = await getAreaList();

    if (res && res.status === 200) {
      setAreaList(res.data.slice(0, MAX_DROPDOWN_ITEMS));
    }
  }

  async function fetchIngredientList() {
    const res = await getIngredientList();

    if (res && res.status === 200) {
      setIngredientList(res.data.slice(0, MAX_DROPDOWN_ITEMS));
    }
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <NavDropdown
          label="Categories"
          type="category"
          listData={categoryList}
          isOpen={openDropdown === "category" && !isNavOpenOnMobile}
          setOpenDropdown={setOpenDropdown}
          setIsNavOpenOnMobile={setIsNavOpenOnMobile}
        />
        <NavDropdown
          label="Areas"
          type="area"
          listData={areaList}
          isOpen={openDropdown === "area" && !isNavOpenOnMobile}
          setOpenDropdown={setOpenDropdown}
          setIsNavOpenOnMobile={setIsNavOpenOnMobile}
        />
        <NavDropdown
          label="Ingredients"
          type="ingredient"
          listData={ingredientList}
          isOpen={openDropdown === "ingredient" && !isNavOpenOnMobile}
          setOpenDropdown={setOpenDropdown}
          setIsNavOpenOnMobile={setIsNavOpenOnMobile}
        />
      </ul>
    </nav>
  );
}

export default Nav;
