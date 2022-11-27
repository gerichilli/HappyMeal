import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
import notFound from "../../assets/images/notfound.png";

function NotFound({ message = "Page Not Found", back = { title: "Homepage", path: "/" } }) {
  return (
    <div className={styles.wrapper}>
      <img src={notFound} alt="Not Found" />
      <h1>{message}</h1>
      <Link to={back.path}>Go to {back.title}</Link>
    </div>
  );
}

export default NotFound;
