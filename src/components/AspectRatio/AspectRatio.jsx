import styles from "./AspectRatio.module.scss";

function AspectRatio({ ratio, children }) {
  return (
    <div className={styles.wrapper} style={{ paddingBottom: `${ratio * 100}%` }}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export default AspectRatio;
