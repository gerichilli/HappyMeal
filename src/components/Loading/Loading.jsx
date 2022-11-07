import loading from "../../assets/images/loading.gif";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.container}>
      <img src={loading} alt="Loading..." />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
