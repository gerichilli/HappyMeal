import styles from "./Footer.module.scss";
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Subscription from "../../components/Subscription";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerMain}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <div className={styles.snsCol}>
            <div className={styles.snsLinks}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={styles.snsLink}
              >
                <CiFacebook size="1.5em" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={styles.snsLink}
              >
                <CiInstagram size="1.5em" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className={styles.snsLink}
              >
                <CiTwitter size="1.5em" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className={styles.snsLink}
              >
                <CiYoutube size="1.5em" />
              </a>
            </div>
            <div className={styles.subscriptContainer}>
              <Subscription />
            </div>
          </div>
          <div className={styles.supportCol}>
            <h2 className={styles.linksTitle}>Support</h2>
            <div className={styles.linksList}>
              <Link to="/" className={styles.link}>
                Contact us
              </Link>
              <Link to="/" className={styles.link}>
                FAQ
              </Link>
              <Link to="/" className={styles.link}>
                Downloads
              </Link>
              <Link to="/" className={styles.link}>
                Locale
              </Link>
              <Link to="/" className={styles.link}>
                Product Registration
              </Link>
            </div>
          </div>
          <div className="othersCol">
            <h2 className={styles.linksTitle}>Happy Meal</h2>
            <div className={styles.linksList}>
              <Link to="/" className={styles.link}>
                About us
              </Link>
              <Link to="/" className={styles.link}>
                Design
              </Link>
              <Link to="/" className={styles.link}>
                Careers
              </Link>
              <Link to="/" className={styles.link}>
                Access
              </Link>
            </div>
          </div>
        </div>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Happy Meal. Developed by Mi Vu
        </p>
      </div>
    </footer>
  );
}

export default Footer;
