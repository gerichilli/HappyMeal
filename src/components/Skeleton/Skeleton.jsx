import styles from "./Skeleton.module.scss";
import createClassName from "../../utils/createClassName";

function Skeleton({ type, ...props }) {
  const classes = createClassName(styles.skeleton, styles[`skeleton--${type}`]);
  return <div className={classes} {...props}></div>;
}

export default Skeleton;
