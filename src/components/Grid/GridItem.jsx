import styles from "./Grid.module.scss";

function GridItem({ children }) {
  return <div className={styles.item}>{children}</div>;
}

export default GridItem;
