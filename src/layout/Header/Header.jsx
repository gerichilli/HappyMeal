import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Nav from "../../components/Nav";
import logo from "../../assets/images/logo.png";
import SearchForm from "../../components/SearchForm";

function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.headerTop}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo" />
          </Link>
          <div className={styles.navContainer}>
            <Nav />
          </div>
          <div className={styles.formContainer}>
            <SearchForm />
          </div>
        </div>
      </div>
      <div className={styles.logBar}>
        <div className="container">
          <div className={styles.logBarBtns}>
            <Link to="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link to="/register" className={styles.registerBtn}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
