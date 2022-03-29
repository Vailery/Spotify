import { InputRange } from "../../InutRange/InputRange";
import styles from "./TrackControls.module.css";

export const TrackControls = () => {
  return (
    <div className={styles.main}>
      <p className={styles.duration}>1:45 / 4:45</p>
      <img src="/assets/img/volume.svg" alt="volume" />

      <InputRange />
      <img src="/assets/img/lirik.svg" alt="lirik" />
    </div>
  );
};
