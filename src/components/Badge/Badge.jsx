import styles from "./Badge.module.scss";
import createClassName from "../../utils/createClassName";

function Badge({ text }) {
  const random = Math.floor(Math.random() * 5) + 1;

  return <span className={createClassName(styles.badge, styles[`badge--${random}`])}>{text}</span>;
}

export default Badge;
