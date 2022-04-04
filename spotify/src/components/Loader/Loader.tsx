import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loader}>
        <div className={styles.line_1}></div>
        <div className={styles.line_2}></div>
        <div className={styles.line_3}></div>
        <div className={styles.line_4}></div>
        <div className={styles.line_5}></div>
        <div className={styles.line_6}></div>
        <div className={styles.line_7}></div>
        <div className={styles.line_8}></div>
        <div className={styles.line_9}></div>
      </div>
    </div>
  );
};
