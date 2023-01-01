import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Nav.module.scss";
import NavDropdown from "./NavDropdown";
import { MAX_DROPDOWN_ITEMS } from "../../utils/constants";
import { fetchAreaList, fetchCategoryList, fetchIngredientList } from "../../redux/thunks/recipeThunk";

function Nav({ isNavOpenOnMobile, setIsNavOpenOnMobile }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.recipes.list.categories);
  const areas = useSelector((state) => state.recipes.list.areas);
  const ingredients = useSelector((state) => state.recipes.list.ingredients);
  const categoryList = categories.slice(0, MAX_DROPDOWN_ITEMS);
  const areaList = areas.slice(0, MAX_DROPDOWN_ITEMS);
  const ingredientList = ingredients.slice(0, MAX_DROPDOWN_ITEMS);

  const [openDropdown, setOpenDropdown] = useState("");

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchAreaList());
    dispatch(fetchIngredientList());
  }, []);

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
