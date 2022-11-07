import styles from "./Skeleton.module.scss";
import createClassName from "../../utils/createClassName";

function Skeleton({ type }) {
  const classes = createClassName(styles.skeleton, styles[`skeleton--${type}`]);
  return <div className={classes}></div>;
}

export default Skeleton;
