import styles from "./InputRange.module.css";

export const InputRange = () => {
  return (
    <input
      className={styles.volume}
      type="range"
      min="0"
      max="100"
      name=""
      id=""
    />
  );
};
