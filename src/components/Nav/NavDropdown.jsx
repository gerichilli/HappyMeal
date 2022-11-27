import styles from "./Nav.module.scss";
import { Link, NavLink } from "react-router-dom";

function NavDropdown({ label, type, listData, isOpen, setOpenDropdown }) {
  const str = type === "category" ? "strCategory" : type === "area" ? "strArea" : "strIngredient";

  function handleOpenDropdown() {
    setOpenDropdown(type);
  }

  function handleCloseDropdown() {
    setOpenDropdown("");
  }

  return (
    <li className={styles.navItem} onMouseOver={handleOpenDropdown} onMouseLeave={handleCloseDropdown} onFocus={handleOpenDropdown}>
      <NavLink to={`/${type}`} className={styles.navLabel}>
        {label}
      </NavLink>
      {isOpen && listData && listData.length > 0 && (
        <div className={styles.navDropdown}>
          <ul className={styles.dropdown}>
            {listData.map((item) => (
              <li key={item[str]}>
                <Link to={`/${type}/${item[str]}`} className={styles.dropItem} onClick={handleCloseDropdown}>
                  {item[str]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavDropdown;
