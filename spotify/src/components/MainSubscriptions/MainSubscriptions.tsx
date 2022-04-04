import styles from "./MainSubscriptions.module.css";
import { IArtistInfo } from "../../services/subscriptions";
import { Artists } from "./Artists";

interface IProps {
  subscr: IArtistInfo[];
}

export const MainSubscriptions = ({ subscr }: IProps) => {
  return (
    <div className={styles.main}>
      {subscr.map((item) => (
        <Artists key={item.id} item={item} />
      ))}
    </div>
  );
};
