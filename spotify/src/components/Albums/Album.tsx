import styles from "./Albums.module.css";
import { useState } from "react";
import { IAlbum } from "../../services/album";
import { usePalette } from "react-palette";
import { useHistory } from "react-router-dom";

interface IProps {
  item: IAlbum;
}

export const Album = ({ item }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const { data } = usePalette(item.cover);
  const history = useHistory();

  return (
    <div
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={() => {
        history.push("/application/album/" + item.id);
      }}
      className={styles.album}
    >
      <div className={styles.albumImg}>
        <img src={item.cover} alt={item.name} />
      </div>

      <div
        className={`${styles.albumInfo} ${
          isHover ? styles.active : styles.inactive
        }`}
        style={{
          background: `linear-gradient(300deg, ${data.muted}, ${data.darkMuted})`,
        }}
      >
        <p>{item.name}</p>

        {item.artists.map((item, index, array) => (
          <p key={item.name + index}>
            {index === array.length - 1 ? item.name : item.name.concat(", ")}
          </p>
        ))}

        <p>{item.total <= 1 ? `${item.total} Song` : `${item.total} Songs`}</p>
      </div>
    </div>
  );
};
