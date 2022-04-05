import styles from "./MainSubscriptions.module.css";
import { IArtistInfo } from "../../services/subscriptions";
import { Artists } from "./Artists";
import { useContext } from "react";
import { ThemeContext } from "../../services/ThemeContext";

interface IProps {
  subscr: IArtistInfo[];
}

export const MainSubscriptions = ({ subscr }: IProps) => {
  const { theme } = useContext(ThemeContext);

  return subscr ? (
    <div className={styles.main}>
      {subscr.map((item, index) => (
        <Artists key={item.id + index} item={item} />
      ))}
    </div>
  ) : (
    <div className={styles.main}>
      <p
        className={styles.error}
        style={{
          color: theme.grayText,
        }}
      >
        No subscriptions...
      </p>
    </div>
  );
};
