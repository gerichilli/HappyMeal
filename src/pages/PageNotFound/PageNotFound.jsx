import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";
import notFound from "../../assets/images/notfound.png";
import Layout from "../../layout/Layout";

function PageNotFound({ message = "Page Not Found" }) {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <img src={notFound} alt="Not Found" />
        <h1>{message}</h1>
        <Link to="/">Go to homepage</Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;
