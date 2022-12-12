import styles from "./Nav.module.scss";
import { Link, NavLink } from "react-router-dom";

function NavDropdown({ label, type, listData, isOpen, setOpenDropdown, setIsNavOpenOnMobile }) {
  const str = type === "category" ? "strCategory" : type === "area" ? "strArea" : "strIngredient";

  function handleOpenDropdown() {
    setOpenDropdown(type);
  }

  function handleCloseDropdown() {
    setOpenDropdown("");
  }

  function handleCloseDropdownOnMobile() {
    setIsNavOpenOnMobile(false);
  }

  return (
    <li
      className={styles.navItem}
      onMouseOver={handleOpenDropdown}
      onMouseLeave={handleCloseDropdown}
      onFocus={handleOpenDropdown}
      onClick={handleCloseDropdownOnMobile}
    >
      <NavLink to={`/${type}`} className={styles.navLabel}>
        {label}
      </NavLink>
      {isOpen && listData && listData.length > 0 && (
        <div className={styles.navDropdown}>
          <ul className={styles.dropdown}>
            {listData.map((item) => (
              <li key={item[str]}>
                <Link to={`/${type}/${item[str]}`} className={styles.dropItem}>
                  {item[str]}
                </Link>
              </li>
            ))}
            <li>
              <Link to={`/${type}`} className={styles.dropItem} onClick={handleCloseDropdown} style={{ fontWeight: 500 }}>
                More
              </Link>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavDropdown;
