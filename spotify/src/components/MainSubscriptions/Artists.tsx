import styles from "./MainSubscriptions.module.css";
import { Palette } from "react-palette";
import { IArtistInfo } from "../../services/subscriptions";
import { useState } from "react";
import { useHistory } from "react-router-dom";

interface IProps {
  item: IArtistInfo;
}

export const Artists = ({ item }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const history = useHistory();

  return (
    <Palette src={item.avatar}>
      {({ data }) => (
        <div
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onClick={() => {
            history.push("/application/artist/" + item.id);
          }}
          className={styles.artist}
          style={
            isHover
              ? {
                  background: `linear-gradient(300deg, ${data.muted}, ${data.darkMuted})`,
                }
              : {}
          }
        >
          <div className={styles.avatar}>
            <img src={item.avatar} alt={item.avatar} />
          </div>

          <p>{item.name}</p>
        </div>
      )}
    </Palette>
  );
};
