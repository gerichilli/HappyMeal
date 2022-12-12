import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { postLogout } from "../../services/authService";
import styles from "./Header.module.scss";
import Nav from "../../components/Nav";
import logo from "../../assets/images/logo.png";
import SearchForm from "../../components/SearchForm";
import { AiOutlinePoweroff, AiFillHeart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { getSavedRecipes } from "../../redux/action/recipeAction";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const displayName = useSelector((state) => state.user.account.displayName);
  const dispatch = useDispatch();
  const [isNavOpenOnMobile, setIsNavOpenOnMobile] = useState(false);

  async function handleLogout() {
    const res = await postLogout();

    if (res && res.data) {
      dispatch(doLogout());
      dispatch(getSavedRecipes([]));
      toast.success(res.data);
    }
  }

  return (
    <header>
      <div className="container">
        <div className={styles.headerTop}>
          <button
            className={styles.menuButton}
            aria-expanded={isNavOpenOnMobile}
            aria-label="Toggle navigation"
            aria-controls="navigation"
            onClick={() => setIsNavOpenOnMobile(!isNavOpenOnMobile)}
          >
            <FiMenu />
          </button>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo" />
          </Link>
          <div className={`${styles.navContainer} ${isNavOpenOnMobile ? styles.navContainerActive : ""}`} id="navigation">
            <Nav isNavOpenOnMobile={isNavOpenOnMobile} setIsNavOpenOnMobile={setIsNavOpenOnMobile} />
          </div>
          <div className={styles.formContainer}>
            <SearchForm />
          </div>
        </div>
      </div>
      <div className={styles.logBar}>
        <div className="container">
          <div className={styles.logBarBtns}>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className={styles.loginBtn}>
                  Login
                </Link>
                <Link to="/register" className={styles.registerBtn}>
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link to="/bookmark" className={styles.bookmarkBtn}>
                  <AiFillHeart /> My Saved Recipes
                </Link>
                <Link to="/profile" className={styles.profileBtn}>
                  <CgProfile /> {displayName || "Profile"}
                </Link>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  <AiOutlinePoweroff /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
