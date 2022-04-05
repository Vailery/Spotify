import styles from "./MainSubscriptions.module.css";
import { Palette } from "react-palette";
import { IArtistInfo } from "../../services/subscriptions";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext";

interface IProps {
  item: IArtistInfo;
}

export const Artists = ({ item }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const { theme } = useContext(ThemeContext);
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
              : { background: theme.bckgColor }
          }
        >
          <div className={styles.avatar}>
            <img src={item.avatar} alt={item.avatar} />
          </div>

          <p
            style={{
              color: theme.lightText,
            }}
          >
            {item.name}
          </p>
        </div>
      )}
    </Palette>
  );
};
