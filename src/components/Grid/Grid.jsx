import styles from "./Grid.module.scss";

function Grid({ colsNum, gx = 0, gy = 0, children }) {
  return (
    <div
      className={styles.grid}
      style={{ "--gx": `${gx}px`, "--gy": `${gy}px`, "--cols": colsNum }}
    >
      {children}
    </div>
  );
}

export default Grid;
