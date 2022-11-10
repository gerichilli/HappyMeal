import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";

function NavDropdown({ label, type, listData, isOpen, setOpenDropdown }) {
  function handleOpenDropdown() {
    setOpenDropdown(type);
  }

  function handleCloseDropdown() {
    setOpenDropdown("");
  }

  function handleToggleDropdown() {
    if (isOpen) {
      handleCloseDropdown();
    } else {
      handleOpenDropdown();
    }
  }

  return (
    <li
      className={styles.navItem}
      onMouseOver={handleOpenDropdown}
      onMouseLeave={handleCloseDropdown}
      onFocus={handleOpenDropdown}
    >
      <button
        className={`${styles.navLabel} ${isOpen ? styles["navLabel--active"] : ""}`}
        onClick={handleToggleDropdown}
      >
        {label}
      </button>
      {isOpen && listData && listData.length > 0 && (
        <div className={styles.navDropdown}>
          <ul className={styles.dropdown}>
            {listData.map((item) =>
              type === "categories" ? (
                <li key={item.strCategory}>
                  <Link
                    to={`/browse?category=${item.strCategory}`}
                    className={styles.dropItem}
                    onClick={handleCloseDropdown}
                  >
                    {item.strCategory}
                  </Link>
                </li>
              ) : type === "areas" ? (
                <li key={item.strArea}>
                  <Link
                    to={`/browse?area=${item.strArea}`}
                    className={styles.dropItem}
                    onClick={handleCloseDropdown}
                  >
                    {item.strArea}
                  </Link>
                </li>
              ) : (
                <li key={item.idIngredient}>
                  <Link
                    to={`/browse?ingredient=${item.strIngredient}`}
                    className={styles.dropItem}
                    onClick={handleCloseDropdown}
                  >
                    {item.strIngredient}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavDropdown;
