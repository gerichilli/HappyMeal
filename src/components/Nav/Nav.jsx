import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";
import NavDropdown from "./NavDropdown";
import { getCategoryList, getAreaList } from "../../services/apiServices";

function Nav() {
  const [openDropdown, setOpenDropdown] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    fetchCategoryList();
    fetchAreaList();
  }, []);

  async function fetchCategoryList() {
    const res = await getCategoryList();

    if (res.status === 200) {
      setCategoryList(res.data);
    }
  }

  async function fetchAreaList() {
    const res = await getAreaList();

    if (res.status === 200) {
      setAreaList(res.data);
    }
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <NavDropdown
          label="Categories"
          type="categories"
          listData={categoryList}
          isOpen={openDropdown === "categories"}
          setOpenDropdown={setOpenDropdown}
        />
        <NavDropdown
          label="Areas"
          type="areas"
          listData={areaList}
          isOpen={openDropdown === "areas"}
          setOpenDropdown={setOpenDropdown}
        />
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} to="/ingredients">
            Ingredients
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
